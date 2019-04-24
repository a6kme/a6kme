import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/npm-package-part-2.md';

const MissingGuideToNpm = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default MissingGuideToNpm;
