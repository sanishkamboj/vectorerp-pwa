module.exports = {
    lintOnSave: true,
    runtimeCompiler: true,
    devServer: {
      proxy: 'http://lee.vectorcontrolsystem.com'
  },
    configureWebpack: {
      //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
      resolve: {
        symlinks: false
      }
    },
    transpileDependencies: ['@coreui/utils']
  }