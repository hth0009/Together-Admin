module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    // devtool: 'source-map'
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  css: {
    // Enable CSS source maps.
    // sourceMap: true
  }
}