/* eslint-disable import/no-unresolved */
import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/what-is-a-neural-network-and-how-does-it-learn.md';

const ArticleContent = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default ArticleContent;
