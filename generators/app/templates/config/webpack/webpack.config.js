const path = require('path')
const resolvePath = dir => path.join(__dirname, '../../', dir);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
        ],
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, resolvePath('src/theme'))
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, resolvePath('src/theme'))
        ]
      },
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, resolvePath('src'))
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, resolvePath('src/theme'))
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, resolvePath('src/theme'))
        ]
      },
    ]
  }
}
