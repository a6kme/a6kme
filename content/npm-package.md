---
title: The guide to create and publish an NPM Package
url: how-to-create-and-publish-an-npm-package
edit: https://github.com/a6kme/a6kme/edit/master/content/npm-package.md
date: 2019-05-15T15:00:00.000Z
abstract: A quick tutorial to create and publish npm packages using <code>@a6kme/create-npm-package</code> CLI
hero:
  img: /static/articles/hero/npm-package.jpg
  alt: Create NPM Package
  credit: Photo by @fempreneurstyledstock on Unsplash
---
Recently, I thought it would be a good idea to modularise some of my JavaScript code into reusable `npm` packages. It started out as something very trivial, but I had to spend considerable amount of time into setting everything and get it working. This article is an attempt to summarize the learning, and create something useful.

To make things simpler and to reduce boilerplate code generation, I have created and published a CLI tool. The tool can be found on [npm repository](https://www.npmjs.com/package/@a6kme/create-npm-package), and the source code for it can be found on [GitHub](https://github.com/a6kme/create-npm-package). We will be using this CLI to generate the boilerplate code for npm package. Please watch the below video to see it in action, and follow below instructions to give it a spin. 

<iframe width="100%" height="400" src="https://www.youtube.com/embed/QtPhERfqmxY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1) **Setup NPM Account 🔑**

One needs an NPM account to be able to publish the packages on npm registry. Head to [https://www.npmjs.com/](https://www.npmjs.com/) and create an account. After creating the account, you need to run `npm login` in the terminal using the credentials you used to create the account on NpmJs. Publishing public packages is free on NpmJs. However, if you wish to publish private packages, you need a paid account.

2) **Install `create-npm-package` CLI tool ⚒️**

`npm install -g @a6kme/create-npm-package`

3) **Create the package folder 📁**

Once you have come up with a name for your package, create the boilerplate for that package with command `create-npm-package <YOUR_PACKAGE_NAME>`

- Select the JavaScript flavour that you want to write your package in. The source code will reside in `src/` of the project directory.
- If you want to use this package as a `<script>` tag in HTML files, select this option. The reason for asking this is the type of bundle webpack will output. If it needs to be used as part of a HTML document, the format has to be UMD. Else, commonJS2 will be more appropriate. You can read more about it in webpack official documentation of [output.libraryTarget](https://webpack.js.org/configuration/output#outputlibrarytarget).

4) **Publish and feel awesome 😀**

The moment that you have been waiting for. You can publish your package now. 
```
npm publish --access public
```

5) **Access your published package**

You can checkout your published package on npmjs.com under your profile. The link should look like `https://www.npmjs.com/settings/<YOUR_NPM_USERNAME>/packages`. You can install this package as a dependency in other project, or can use it as a script tag in browser. 

[unpkg.com](https://unpkg.com) provides free CDN for your published packages on npm. You can access your build by going to `unpkg.com/@<YOUR_NPM_USERNAME>/<YOUR_PACKAGE_NAME>` and then using the distribution as `<script>` tag in an html file.