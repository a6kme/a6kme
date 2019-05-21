const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const _ = require('lodash');

module.exports = function createArticlePages(dir) {
  // Delete all articles pages pages/articles
  fs.readdirSync(path.join(dir, 'pages/articles')).forEach((fileName) => {
    if (fileName !== 'index.jsx') {
      fs.unlinkSync(path.join(dir, 'pages/articles', fileName));
    }
  });
  const compiledArticleTemplate = _.template(
    fs.readFileSync(path.join(dir, 'build/article-template.jsx'))
  );

  const contentDir = path.join(dir, 'content');
  fs.readdirSync(contentDir).forEach((fileName) => {
    const fileContent = fs.readFileSync(path.join(contentDir, fileName), 'utf8');
    const mdContent = fm(fileContent);
    if (!mdContent.attributes.draft) {
      fs.writeFileSync(
        path.join(dir, 'pages/articles', `${mdContent.attributes.url}.jsx`),
        compiledArticleTemplate({ mdFileName: fileName })
      );
    }
  });
};
