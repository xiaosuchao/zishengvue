module.exports = {
  outputDir: '../vuedist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {

    port: 8086, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: {
      '/apidev': {
        target: 'http:/shop.fafasc.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '^/apidev': ''
        }
      }
    }

    // cssSourceMap: false
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: '#03a9f4',
          blue: '#3eaf7c',
          orange: '#f08d49',
          'text-color': '#111'
        }
      }
    }
  },
  parallel: require('os').cpus().length > 1
}
