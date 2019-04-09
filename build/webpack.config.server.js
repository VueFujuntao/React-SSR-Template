const path = require('path');
const Merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = Merge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js'),
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
  }
})