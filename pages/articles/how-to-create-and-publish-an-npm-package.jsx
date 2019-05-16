/* eslint-disable import/no-unresolved */
import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/npm-package.md';

const ArticleContent = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default ArticleContent;
