const { resolve } = require('path')
const { modifyVars } = require('./src/utils/themeColor.ts')

module.exports = {
  chainWebpack: config => {
    //svg
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(resolve(__dirname, "src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve(__dirname, "src/assets/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  },
  configureWebpack: {
    module:{
      rules:[{
        test:/\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }]
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://www.fastmock.site/mock/4f0737cf332a1290110941d6aafc42b5/lowcode',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  }
}