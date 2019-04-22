import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/the-missing-guide-to-create-an-npm-library.md';

const MissingGuideToNpm = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default MissingGuideToNpm;
