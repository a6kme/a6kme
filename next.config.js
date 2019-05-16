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
      dir
    }) {
    createArticlePages(dir);
    return defaultPathMap;
  }
};
