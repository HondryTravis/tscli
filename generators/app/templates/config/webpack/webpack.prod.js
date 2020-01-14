const path = require('path')
const config = require('./webpack.config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const extend = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
  },
}
module.exports = merge(config, extend)
