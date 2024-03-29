const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  assetsDir: "static",
  productionSourceMap: false,
  outputDir: 'supplier',
  devServer: {
    open: true, //自动开启浏览器
    host: 'localhost', //本地服务地址
    port: 8080, //端口号
    https: true, //是否是https协议
    hotOnly: false, //热加载
    //代理
    proxy: {
        'api': {
            target: 'https://www.cc360.com.cn',
            secure: true, //是否是https
            changeOrigin: true, //是否允许跨域
            pathRewrite: {
                "^api/": ''
            }
        }
      }
    },
  lintOnSave: false,
  configureWebpack: config => {
    //gzip
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      );

    } else {
      // 开发环境
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
    config.externals = {
      'vue': 'Vue',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'vue-i18n': 'VueI18n',
    }
  },
  chainWebpack: config => {
    // config.optimization.delete('splitChunks')
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

  }
}
