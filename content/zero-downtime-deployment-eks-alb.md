---
title: Zero Downtime Deployment Upgrades using AWS ALB on Kubernetes
date: 2020-02-24T15:00:00.000Z
url: zero-downtime-deployment-using-aws-alb-on-kubernetes
edit: https://github.com/a6kme/a6kme/edit/master/content/zero-downtime-deployment-eks-alb.md
abstract: AWS Application Load Balancer gives better API and feature set as compared to Classic Load Balancers. In this article, I will show you how we configured our Kubernetes Deployment at PushOwl to do rolling upgrades of our pods without any outage.
hero:
 img: /static/articles/hero/balance.jpg
 alt: AWS ALB on Kubernetes
 credit: Photo by @jeremythomasphoto on Unsplash
---
We here at PushOwl, use Kubernetes for our backend infrastructure. We use EKS (Elastic Kubernetes Service), which is managed Kubernetes on top of AWS infrastructure. We are using Application Load Balancers to route traffic from the external world to our web `(Gunicorn <-> Django)` workers using HTTPS protocol. We started seeing a spike in `5XX` errors whenever there was a CD triggered by our Deployment Pipeline. This article is a dissection of a problem and how we went about solving it.

### Classic Load Balancer vs Application Load Balancer in Kubernetes

A classic load balancer operates on layer 4 of [OSI Model](https://en.wikipedia.org/wiki/OSI_model), i.e `transport layer` of networking. It routes packets to its destination using `IP Address:Port` of the destination address. An application load balancer operates on layer 7 of OSI Model, i.e `application layer`. This feature of ALB allows it to route packets not just based on IP and port of the target, but with host name, url endpoint in the headers of network packets. We can configure our ingress API object of Kubernetes to route packets based on host name and URLs of destination packets.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
 name: backend-ingress
 annotations:
   kubernetes.io/ingress.class: alb
   alb.ingress.kubernetes.io/scheme: internet-facing
   alb.ingress.kubernetes.io/target-type: ip
spec:
 rules:
   - host: api.pushowl.com
     http:
       paths:
         - path: /api_v1/*
           backend:
             serviceName: "gunicorn"
             servicePort: 80
         - path: /api_v2/*
           backend:
             serviceName: "gunicorn_v2"
             servicePort: 80
   - host: api-beta.pushowl.com
     http:
       paths:
         - path: /api_v1/*
           backend:
             serviceName: "gunicorn-beta"
             servicePort: 80
```

<div style="display: flex; align-items: center; flex-direction: column; width: 90%">
   <p style="margin: 0; font-size: 0.75em">
       Host and URL based routing in Ingress Spec
   </p>
</div>

This routing feature of ingress API object makes it very powerful and re-usable across multiple services in the same namespace. As an example, we can do an A/B testing of a deployment using the same load balancer, routing packets to different services based on different URL endpoints or host name. This helps us save Load Balancer-hour and money, as compared to spinning another load balancer for another service.

A classic load balancer in AWS EKS can be created by declaring `spec.type: LoadBalancer` in the Service Object declaration, while you need an `ingress controller` to use Application Load Balancer with EKS.

### Ingress Controller

Ingress controller is a deployment object which watches Kubernetes APIs for any change in Ingress resources and creates or updates the underlying configurations of the load balancer. Example - Whenever a new rule in `spec.rules` is added or removed, Ingress Controller updates target group of underlying ALB, so that packets reach their intended destinations.

One of the most important responsibilities of Ingress Controller is to watch for any new pod which spins up due to HPA (Horizontal Pod Autoscaler) kicking in and add them to Target Group of ALB. Similarly, if any pod is terminated, due to HPA kicking in or due to rolling upgrade, Ingress Controller should remove those targets from ALB Target groups, so that ALB starts sending traffic to new pods and stops sending traffic to terminated pods. However, we observed that there was a delay between Kubernetes terminating a pod and Ingress Controller hitting AWS APIs to remove that target from the target group. This led to a lot of `502`s and `504`s whenever our CD triggered a rolling upgrade for our deployment. You can find more that in the [issue that I raised](https://github.com/kubernetes-sigs/aws-alb-ingress-controller/issues/1131) on Github.

### Pre-Stop hooks and configuring upgrade strategy

We made 2 changes in our `deployment` spec.

1. We modified our `RollingUpgrade` strategy as below. It was done so that Kubernetes will update running pods one by one. It will spin up a new pod, and then send a termination signal to one of older running pods, and keep doing this till all the pods are upgraded to new replica set.

   ```yaml
   spec:
   strategy:
       type: RollingUpdate
       rollingUpdate:
       maxUnavailable: 0
       maxSurge: 1
   ```

2. We set a `preStop` in the lifecycle hook of our Container. Kubernetes executes `preStop` hook along with sending `terminate` signal to the running pod. Introducing a delay between sending `TERM` signal to underlying container and marking the pod as terminating, gives Ingress Controller enough time to remove the target from ALB target group.

   ```yaml
   spec:
   template:
       spec:
       terminationGracePeriodSeconds: 45
       containers:
           lifecycle:
           preStop:
               exec:
               command:
                   - sh
                   - -c
                   - sleep 25
   ```

Both of the actions were taken to slow down the rolling upgrade process. This way, Ingress Controller had enough time to hit AWS APIs whenever any pod was terminated, so that ALB would remove that target from it's target group. After doing this, we stopped seeing any more `5xx` errors during our deployment upgrades.

### Pod Readiness Gates (Stretch)

The ideal way of solving this is by using Pod Readiness Gates, but as of writing this article, the [PR is still WIP](https://github.com/kubernetes-sigs/aws-alb-ingress-controller/pull/955). A good resource to understand Pod Readiness Gates is this [Kubecon Video by Minhan (Google)](https://www.youtube.com/watch?v=Vw9GmSeomFg). Essentially, It lets the upgrade manager get feedback from ALB, that it has registered the new pod in the target group. The upgrade manager waits till it has received the feedback. This way, there is a two way communication from Load Balancer to Upgrade Manager, as compared to Upgrade Manager going on about upgrading without caring about the state of the Target Groups in the load balancer.
