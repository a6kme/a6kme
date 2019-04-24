---
title: The guide to create and publish an NPM Package - Part 1
url: how-to-create-and-publish-an-npm-package-part-1
edit: https://github.com/a6kme/a6kme/edit/master/content/npm-package-part-1.md
date: 2019-04-20T15:00:00.000Z
hero:
  img: /static/articles/hero/npm-package-part-1.jpg
  alt: Create NPM Package - Part 1
  credit: Photo by @fempreneurstyledstock on Unsplash
---
Recently, I thought it would be a good idea to modularise some of my JavaScript code into reusable `npm` packages. It started out as something very trivial, but I had to spend considerable amount of time into setting everything and get it working. This article is an attempt to summarize the learning, which I have gathered from various resources. At the end of this article, a reader would be able to use the published npm package as either an `ES6 import`, `CommonJs require` or can use it as a `<script>` tag in browser. 

For the purpose of this demonstration, I will be using a library, `@a6kme/math` that I created, and the source code can be found at [https://github.com/a6kme/math](https://github.com/a6kme/math).

1) **Setup NPM Account**

One needs an NPM account to be able to publish the packages on npm registry. Head to [https://www.npmjs.com/](https://www.npmjs.com/) and create an account. After creating the account, you need to run `npm login` in the terminal using the credentials you used to create the account on NpmJs. Publishing public packages is free on NpmJs. However, if you wish to publish private packages, you need a paid account.

2) **Set up package directory and decide on a name for your package**

One needs a name, which can be used to identify the package in NPM registry. If you have thought of a name, please search on npm registry, whether the name is already taken. If the name doesn't exist, you are good to go to take that name and publish the package as public package. If it exists, you should use scoped name for you package. Example - If you username in npm is `username` you can name your package as `@username/package-name`. 

After you have come up with a useful name, let's call it `package-name` for further discussions, create a repository on Github, with `package-name` as the repository name. You will get a URL like `https://github.com/<YOUR_USERNAME>/<PACKAGE_NAME>`. We will need this URL when setting `repository.url` property in next steps.

Clone [https://github.com/a6kme/npm-package-boilerplate](https://github.com/a6kme/npm-package-boilerplate). It is a repository of  [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) which comprises of basic housekeeping files, like `package.json`, `.gitignore`, `.eslintrc` etc, which you can use out of the box from the code repository. You can read details of files in the boilerplate in the homepage of the code repository. 

After cloning, rename the folder `npm-package-boilerplate` to the name that you have thought of your package. For the sake of this tutorial, let's rename it to `package-name`. After that, update the `name` and `repository.url` (the one which you got while creating Github repository) of `package-name/package.json`. After doing this, install the packages locally. 
```
npm install
```

I know. We haven't written any meaningful code till now. Almost there. Hang tight.

3) **Write main code in `src/`**

Now, it is time when we actually start writing some actual code in the `src/` directory. 
<script src="https://gist.github.com/a6kme/49b70c2ae81c62e3ea3efd661bbe7de2.js"></script>
We have exported two functions from `src/arithmetic/add.js` and `src/range/max.js`. Also, for the end user of the library to be able to import those methods from our library, like `import { add } from 'package-name'`, we have done named exports from `src/index.js`.

4) **Write tests**

Now, let us get right down to writing tests. The tests will be executed using the `jest` testing framework. You can dive in depth of JestJs [here](https://jestjs.io/). Any reliable software should always be shipped with unit and functional tests, and our library won't be devoid of it. 
<script src="https://gist.github.com/a6kme/2a82990b39030ebae7b20d9fb455570a.js"></script>
There are other ways through which we can add test and organize our directory structure according to that, but discussion about that is outside of scope of this write up. I would recommend the reader to make their own choices by exploring options.

5) **Build and test version 1.0**

If you have been following the article till now, you are now ready to build and test your newly built library in the browser. 

First we need to install `lodash` as `devDependency` and `peerDependency` in our `package.json` file. 
```
npm install --save-dev lodash
```
Also put `lodash` as peerDependency in your `package.json`. Please see [here](https://github.com/a6kme/math/blob/e3ed25393eeee84f94d3050b0b8ec5f63f6ddad3/package.json#L42) for example. 
```
"peerDependencies": {
  "lodash": "*"
}
```
Build your package. 
```
npm run build
```
Above step will run your tests, and output the package in `dist/main.js` file. 


6) **Publish and feel awesome 😀**

The moment that you have been waiting for. You can publish your package now. 
```
npm publish
```
You can access your build by going to `unpkg.com/:package` and then using the distribution as `<script>` tag in an html file.

7) **Optimise the bundle size**

Now that we have seen our library in action, we would want to do some optimizations in terms of build size, and be able to follow industry standard practices around tagging our releases on Github. Please proceed to [Part 2](/articles/how-to-create-and-publish-an-npm-package-part-2) of this article to know more about those. 