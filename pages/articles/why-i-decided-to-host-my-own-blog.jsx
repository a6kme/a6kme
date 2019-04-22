import React from 'react';
import Article from '../../components/articles';
import { html, attributes } from '../../content/why-i-decided-to-host-my-own-blog.md';

const OwnBlog = () => (
  <Article
    html={html}
    attributes={attributes}
  />
);

export default OwnBlog;
