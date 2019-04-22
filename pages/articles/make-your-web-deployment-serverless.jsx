import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/make-your-web-deployment-serverless.md';

const ServerLessDeployment = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default ServerLessDeployment;
