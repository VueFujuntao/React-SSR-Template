const path = require('path');
const Merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = Merge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js'),
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  }
})