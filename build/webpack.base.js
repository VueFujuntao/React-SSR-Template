const path = require('path');
const webpack = require('webpack');

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
        test: /.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /.js/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}