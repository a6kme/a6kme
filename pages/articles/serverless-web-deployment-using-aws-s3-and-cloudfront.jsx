import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/serverless-web-deployment.md';

const ServerLessDeployment = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default ServerLessDeployment;
