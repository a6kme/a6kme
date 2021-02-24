---
title: Performance test a service using Apache JMeter and scale using Docker
date: 2019-06-28T15:00:00.000Z
url: performance-test-a-service-with-jmeter-and-scale-with-docker
edit: https://github.com/a6kme/a6kme/edit/master/content/perftest-docker-jmeter.md
abstract: In this article, we will test a single instance of our service with Apache JMeter and see how horizontally scaling our app with Docker can improve performance significantly
hero:
  img: /articles/hero/docker.png
  alt: Performance test a service using JMeter
  credit: Source - https://99designs.com/ 
---
## A brief introduction to Docker

Docker is a [container](https://www.docker.com/resources/what-container) platform, which we can use to package our application, with all it's dependencies. We bundle everything, from system libraries to code to runtime to settings.. You get the idea. It takes away all the hassles of installing the dependencies on the host operating system, like `python` or `node` or any linux `dev-tools` that you do before running any application. Remember dependencies section in any documentation, which asks you to do `sudo apt-get install` a lot of stuff? So basically, you spin up any system, install Docker engine on it, and run your containerised application on it without any worry about it's dependencies or runtime etc. being installed on it. Also, scaling your containers on demand becomes super easy and cost effective with hosted service providers, such as AWS Fargate.

Internet is swamped with tutorials on getting started with Docker (My favourite is [Docker Official Guide](https://docs.docker.com/get-started/)), so I will not be covering that here. I will assume you have installed the Docker engine on your host operating system, and can access commands like `docker ps`, `docker images` etc on your terminal. If you have not done so, you can easily find the documentation to do that on Docker official documentation. I will also assume that you know the basics of Dockerfile, or how to create a Docker image. Getting started guide of Docker can help you get up and running with these in no time.

## Also, an introduction to Apache JMeter

[Apache JMeter](https://jmeter.apache.org/) is a tool, which can be used to test functional behaviour and measure performance of applications and services. It can also be used to test complex web workflows, like log into a web application, and send authenticated requests subsequently, by using sessions and cookies. You can also simulate on your Databases or Messaging servers using proper JDBC or JMS drivers. Check out their Getting Started guide to know more about the tool.

## Enough of introductions. Show me the code 💻

So, let's quickly move on to the topic of this article! All of the source code that has been used in this experiment can be found on my [Github Repository](https://github.com/a6kme/perftest-jmeter-docker).

## What we will be building

We have a simple containerised Node application, in which I have mocked a network request for 200ms delay. We will have two scenarios:

- JMeter sending load to a single container of Node app
- JMeter sending load to nginx reverse proxy, which will be balancing load on 3 containers of the same app

<img src="/articles/perftest-jmeter/scenarios.jpg">

We will be doing 2 experiments, one with 1000 threads and another with 6000 threads, with ramp up time of 1 minute (60 Seconds), and show that at lower throughput, the 95th and 99th percentiles are not affected as badly as higher throughput.

### 1000 Threads

#### Scenario 1

<img src="/articles/perftest-jmeter/scenario-1-apdex-1000.png">
<img src="/articles/perftest-jmeter/scenario-1-1000.png">

#### Scenario 2

<img src="/articles/perftest-jmeter/scenario-2-apdex-1000.png">
<img src="/articles/perftest-jmeter/scenario-2-1000.png">

### 6000 Threads

#### Scenario 1

<img src="/articles/perftest-jmeter/scenario-1-apdex-6000.png">
<img src="/articles/perftest-jmeter/scenario-1-6000.png">

#### Scenario 2

<img src="/articles/perftest-jmeter/scenario-2-apdex-6000.png">
<img src="/articles/perftest-jmeter/scenario-2-6000.png">

As it is evident from the test results, at lower throughput, the improvement in 99th percentile and 95th percentile is not much. 

99th Precentile Improvement `(223 - 214)/214 = 4%`.
95th Percentile Improvement `(209 - 208)/208 = .4%`

But at higher throughput, the story is very different. Without much increment in overall throughput `(932 - 741)/741 = 25%`, the higher percentile response times see a very significant improvement.

99th Precentile Improvement `(16185 - 572)/572 = 2729%`.
95th Percentile Improvement `(7507 - 470)/470 = 1497%`.

In lower throughput, the [APDEX](https://en.wikipedia.org/wiki/Apdex) score is same. But in case of high throughput, the APDEX score improves by a whooping `(0.956-0.570)/0.570 = 67%`. Means, you end up making your customers happier in 67% of times. Not a bad number for overall business. 😎

## Moral of the story

It is of paramount importance, that we prefer and scale our applications horizontally, not only for a throughput increase, but also for higher percentile response time improvement, as we want to keep our APDEX score, to near perfect.

In another article, I would be showing how can we use AWS ECS service discovery to easily deploy our application stack on AWS Fargate and scale it easily, with lots of cost benefit.
