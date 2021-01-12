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
    pwa: {
      themeColor: '#4DBA87',
      msTileColor: '#000000',
    }
    transpileDependencies: ['@coreui/utils']
  }