var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require("./blockConfig");

module.exports = {
  cache: true, //开启缓存模式
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, "../dist/dist"), // string
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/dist/'
  },
  module: config.moduleConfig,
  resolve: config.resolveConfig,
  plugins: [
    ...config.prod_pluginConfig,
    new ExtractTextPlugin('app.css', {
        allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({
      title: '主页',
      template: './src/index.html',
      filename: '../index.html',
      inject: 'body',
      hash: true,
      minify:{removeAttributeQuotes: true}

    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../log/vendor-manifest.json')
    }),
    /**
     * 提取公共块，到commons.js文件中
     */
    new webpack.optimize.CommonsChunkPlugin({
      name:'init',
      filename: 'commons.js',
      minChunks: function () {
        return true;
      }
    })
  ]
}
