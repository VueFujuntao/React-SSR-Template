const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === 'development';

const config = Merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(s)?css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     "css-loader"
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../public/server.index.ejs'),
      filename: 'server.ejs',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeComments: true
      }
    }),
    // new MiniCssExtractPlugin()
  ]
})

if (isDev) {
  config.mode = 'development'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: 8888,
    // contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
  // 
  const plugins = [new webpack.HotModuleReplacementPlugin(),  new webpack.NoEmitOnErrorsPlugin()]
  config.plugins.push(...plugins);
}

module.exports = config;
