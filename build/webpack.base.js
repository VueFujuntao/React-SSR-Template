const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: './public/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, '..', 'node_modules')],
  },
  module: {
    rules: [{
        test: /.js|jsx$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      // {
      //   test: /.js/,
      //   loader: 'babel-loader'
      //   ,
      //   exclude: [
      //     path.join(__dirname, '../node_modules')
      //   ]
      // },
      {
        test: /\.css$/,
        use: [{
            loader: ExtractCssChunks.loader,
            options: {
              hot: true
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, '/node_modules/antd'),
        use: [{
            loader: ExtractCssChunks.loader,
            options: {
              hot: true
            },
          },
          'css-loader', 'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 100
    }),
    new ExtractCssChunks({
      filename: 'static/css/[name].css',
      chunkFilename: '[id].css'
    }),
  ]
}