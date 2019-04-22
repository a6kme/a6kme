---
title: The missing guide to create an NPM library and publish it on NPM registry
date: 2019-04-20T15:00:00.000Z
---
Recently, I thought it would be a good idea to modularise some of my JavaScript code into reusable npm packages. It started out as something very trivial, but I had to spend considerable amount of time into setting everything and get it working. This article is an attempt to summarize the learning, which I have gathered from various resources. At the end of this article, a reader would be able to use the published npm package as either an `ES6 import`, `require` or can use it as a `<script>` tag in browser. 

1) **NPM init**

Second Paragraph

2) **Set up package.json for scoped public package**
3) **Write main code in `src/`**
4) **Set up `webpack` to use appropriate loaders**
5) **Externalize dependencies to be put as peerDependencies to avoid bundling in the core library 
and also put the dependencies as devDependency**
6) **Write tests**
7) **Do not add `.npmignore` file, instead use `files` property of package.json.**
8) **Decide between main and module**
9) **Test it before publishing it to NPM**
10) **Publish and feel awesome 😀**
