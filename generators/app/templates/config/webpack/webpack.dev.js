const config = require('./webpack.config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const extend = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    })
  ],
  output: {
    filename: '[name].[hash].js',
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    open: true
  },
}
module.exports = merge(config, extend)

