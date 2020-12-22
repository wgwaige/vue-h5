'use strict'
const path = require('path')
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "http://www.webqianduan.com/",
        changeOrigin: true //是否跨域
      }
    },

    host: "0.0.0.0", // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: false,
    showEslintErrorsInOverlay: false,
    devtool: "eval-source-map",
    cacheBusting: true,
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
