const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
    compress: true,
    publicPath: '/',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx$|\.(j|t)s$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean)
          }
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/i,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ]
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          API_BASE_URL: process.env.API_BASE_URL ? `'${process.env.API_BASE_URL}'` : '\'http://localhost:3000\'',
        },
      },
    })
  ].filter(Boolean)
};
