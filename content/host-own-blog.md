---
title: Why I decided to host my own blog instead of going for service providers
date: 2019-04-20T15:00:00.000Z
url: why-i-decided-to-host-my-own-blog
edit: https://github.com/a6kme/a6kme/edit/master/content/host-own-blog.md
hero:
  img: /static/articles/hero/host-own-blog.jpg
  alt: Host own blog
  credit: Photo by @iankeefe on Unsplash
---

For quite long, I have been sitting on the idea of putting up and owning a cozy space on internet, which I can call my own. Where I can open up to the world, and put up stuff which I learn, or my miscellaneous thoughts. However, I never actually went around doing it because of sheer laziness and part fear of embarrassment that it would have brought, if I was no good ([Imposter Syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome) is real, people) 😌. But finally I decided to get over that, and start to do that. Also, Reid Hoffman has been very vocal about the fact that
> If you're not embarrassed by the first version of your product, you've launched too late.

So here I go. I hope it would be helpful to someone in some way. 

I would also take this opportunity to explain the rationale behind why I decided to host my own blog, reinventing the wheel during the course, instead of going for a hosted provider like WordPress or Medium. The source code for this blog can be found under my [Github Account](https://github.com/a6kme/a6kme). I have tried to summarize the reasons below, which in my opinion, should be taken with a grain of salt. 

- Recently, Medium started to block the articles by showing a PayWall. I am not holding it against Medium in any way. A company gotta make money to keep it's servers running. I just did not want articles or resources owned by me to be PayWalled by a 3rd party. 
<img src="/static/articles/host-own-blog/paywall.png">
- We live in a world which has been affected a lot by OSS (Open Source Software), and the power of it comes from community. Developers feel empowered since they can contribute directly to the software, in the form of submitting patch for source code, writing documentation, creating issues etc. I also wanted to do this with my blog. I can set up an edit button right at the bottom of each page, so that anyone can raise a PR against that article, and be a part of it.
- I have worked with WordPress in the past, and I am not a very big fan of it. I thought it would be an overkill to set up a `WYSIWYG` editor for the limited use case, which I can easily get through `markdown` files and a `webpack` loader for it. Also, having built it from bottom up gives me the sheer joy of being able to control each and every pixel of my blog. ✌️
- From all the content that I am going to create, it is going to produce some SEO juice. And I wanted all the organic traffic from my original content to be routed to my own domain. 👻