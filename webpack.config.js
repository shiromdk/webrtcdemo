const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: ['./client/src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use:{
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env','@babel/react'],

          }
        }
      
      },
      {
        test: /\.m?js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['@babel/preset-env','@babel/react'],


          }
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|otf)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
    // new CopyWebpackPlugin([{ from: 'assets', to: '' }]),
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:9001',
    }),
  },
}
