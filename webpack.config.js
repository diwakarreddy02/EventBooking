module.exports = {
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      path: false,
      path: require.resolve("path-browserify"),
    },
  },
};
