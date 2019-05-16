const fs = require('fs');
const path = require('path');
const createArticlePages = require('./build/parse-content');

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        use: 'frontmatter-markdown-loader'
      }
    );
    return cfg;
  },
  async exportPathMap(defaultPathMap,
    {
      dir, outDir, dev
    }) {
    createArticlePages(dir);
    if (!dev) {
      ['robots.txt', 'sitemap.xml'].forEach(fileName => fs.copyFileSync(
        path.join(dir, fileName), path.join(outDir, fileName)
      ));
    }
    return defaultPathMap;
  }
};
