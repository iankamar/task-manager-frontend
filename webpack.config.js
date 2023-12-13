const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  resolve: {
    fallback: {
      assert: require.resolve("assert"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
    },
  },
};
