module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    // devtool: 'source-map'
  },
  css: {
    // Enable CSS source maps.
    // sourceMap: true
  }
}