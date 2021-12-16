const privateAssets = require('./.config.assets.js')

const path = require('path')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
  },
  // cdn的css链接
  css: [
    ...privateAssets.css
  ],
  // cdn的js链接
  js: [
    ...privateAssets.js
  ]
}

module.exports = {
  publicPath: './',
  outputDir: '../docs',
  productionSourceMap: false,
  chainWebpack: config => {
    config.module.rule('pdfjs-dist').test({
      test: /\.js$/,
      include: path.join(__dirname, 'node_modules/pdfjs-dist')
    }).use('babel-loader').loader('babel-loader').options({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-optional-chaining']
    })

    // -------------------------- 配置pdf文件----------------------------------------
    config.module
      .rule('pdf')
      .test(/\.(pdf)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000
      })
      .end()
    // -------------------------- 配置pdf文件----------------------------------------

    // config
    //   .entry('index')
    //   .add('babel-polyfill')
    //   .end()
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    config.plugin('html').tap(args => {
      if (isProduction || process.env.VUE_APP_DEV_NEED_CDN !== 'false') args[0].cdn = cdn
      return args
    })

    if (isProduction) {
      config.output
        .set('filename', 'static/js/[name].[contenthash:8].js')
        .set('chunkFilename', 'static/js/[name].[contenthash:8].js')
    }
  },
  configureWebpack: config => {
    if (isProduction || process.env.VUE_APP_DEV_NEED_CDN !== 'false') config.externals = cdn.externals
    if (isProduction) {
      config.devtool = false
      config.optimization.usedExports = true
      config.optimization.splitChunks = {
        minSize: 10000,
        maxSize: 250000,
        chunks: 'all',
        maxInitialRequests: 20,
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            minChunks: 1,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 3,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },
  devServer: {
    open: true
    // headers: {
    //   'Access-Control-Allow-Origin: http://172.20.0.206'//一般用法（*，指定域，动态设置），3是因为*不允许携带认证头和cookies
    //   'Access-Control-Allow-Origin': '*'
    // }
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-cn',
      fallbackLocale: 'en',
      localeDir: 'locale',
      enableInSFC: false
    },
    moment: {
      locales: [
        'zh-cn',
        'en'
      ]
    }
  }
}
