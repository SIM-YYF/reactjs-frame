const path = require('path');
// 引用公共配置
var config = require("./blockConfig");
__dirname = path.resolve(__dirname, '..')
module.exports = {
  entry: {
    vendor: [
      'components'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/dist'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  module: config.moduleConfig,
  resolve: config.resolveConfig,
  plugins: config.dll_pluginConfig
};
