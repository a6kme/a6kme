/* eslint-disable import/no-unresolved */
import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/perftest-docker-jmeter.md';

const ArticleContent = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default ArticleContent;
