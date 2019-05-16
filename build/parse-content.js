const path = require('path');
const fs = require('fs');
const fm = require('front-matter');
const _ = require('lodash');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

module.exports = function createArticlePages(dir) {
  // Delete all the files from pages/articles
  fs.readdirSync(path.join(dir, 'pages/articles')).forEach((fileName) => {
    fs.unlinkSync(path.join(dir, 'pages/articles', fileName));
  });
  const compiledArticleTemplate = _.template(
    fs.readFileSync(path.join(dir, 'build/article-template.jsx'))
  );

  const compiledIndexTemplate = _.template(
    fs.readFileSync(path.join(dir, 'build/index-template.jsx'))
  );
  const contentDir = path.join(dir, 'content');
  let articlesLiContent = '';
  const articlesAttributesList = [];
  fs.readdirSync(contentDir).forEach((fileName) => {
    const fileContent = fs.readFileSync(path.join(contentDir, fileName), 'utf8');
    const mdContent = fm(fileContent);
    if (!mdContent.attributes.draft) {
      mdContent.attributes.fileName = fileName;
      articlesAttributesList.push(mdContent.attributes);
    }
  });

  // Sort according to date
  articlesAttributesList.sort((a, b) => a.date < b.date);

  articlesAttributesList.forEach((articleAttribute) => {
    fs.writeFileSync(
      path.join(dir, 'pages/articles', `${articleAttribute.url}.jsx`),
      compiledArticleTemplate({ mdFileName: articleAttribute.fileName })
    );
    const articleDate = articleAttribute.date;
    const articleListContent = `<li className={classes.articles}>
        <a href="/articles/${articleAttribute.url}">
          <span>${monthNames[articleDate.getMonth()]} ${articleDate.getDate()}, ${articleDate.getFullYear()}</span>
          <h5>${articleAttribute.title}</h5>
          <p>
            ${articleAttribute.abstract}
          </p>
        </a>
    </li>`;
    articlesLiContent = articlesLiContent === '' ? articleListContent : `${articlesLiContent}
    ${articleListContent}`;
  });

  fs.writeFileSync(
    path.join(dir, 'pages/articles/index.jsx'),
    compiledIndexTemplate({ articleList: articlesLiContent })
  );
};
