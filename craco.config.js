/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@commons": path.resolve(__dirname, "src/commons"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@theme": path.resolve(__dirname, "src/theme"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
};
