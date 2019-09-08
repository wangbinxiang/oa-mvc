const path = require('path')
// const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

// cdn预加载使用
// const externals = {
//   'vue': 'Vue',
//   'vue-router': 'VueRouter',
//   'vuex': 'Vuex',
//   'axios': 'axios',
//   'element-ui': 'ELEMENT',
//   'js-cookie': 'Cookies',
//   'nprogress': 'NProgress'
// }

// 是否使用gzip
// const productionGzip = true
// // 需要gzip压缩的文件后缀
// const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'assets',
  // 放置生成的静态资源,(相对于 outputDir 的) 目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // 加速生产环境构建
  productionSourceMap: false,
  pages: {
    index: {
      // page 的入口
      entry: 'src/pages/main.ts',
      // 模板来源
      template: 'src/pages/index.html',
      // 在 dist/index.html 的输出
      // filename: '../viewer/index.ejs',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '汇众联合',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `main/subpage.html`
    // 并且如果找不到的话，就回退到 `main/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // client: 'src/main.ts'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://oa.sandbox.unintelli.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },

  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: config => {
    // config.plugins.push(
    //   new BundleAnalyzerPlugin({ analyzerPort: 8919 })
    // )
    // config.plugins.push(
    //   new webpack.optimize.LimitChunkCountPlugin({
    //     maxChunks: 2
    //   })
    // )
    // const myConfig = {}
    // if (process.env.NODE_ENV === 'production') {
    //   // 1. 生产环境 npm 包转 CDN
    //   myConfig.externals = externals

    //   myConfig.plugins = []
    //   // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
    //   productionGzip &&
    //     myConfig.plugins.push(
    //       new CompressionWebpackPlugin({
    //         test: new RegExp(
    //           '\\.(' + productionGzipExtensions.join('|') + ')$'
    //         ),
    //         threshold: 8192,
    //         minRatio: 0.8
    //       })
    //     )
    // }
    // if (process.env.NODE_ENV === 'development') {
    //   /**
    //    * 关闭host check，方便使用ngrok之类的内网转发工具
    //    */
    //   myConfig.devServer = {
    //     disableHostCheck: true
    //   }
    // }
    // return myConfig
  }
}
