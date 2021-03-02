const VueLoaderPlagin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { options } = require('less');

module.exports = {
  entry: {
    main: resolve(__dirname, 'src', 'main.js')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                math: 'always'
              }
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          filename: '[name].[ext]',
          publicPath: './images',
          outputPath: './images/',
          esModule: false
        }
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    publicPath: '/',
    host: '0.0.0.0'
  },
  plugins: [
    new VueLoaderPlagin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'src', 'public', 'index.html'),
      publicPath: '/'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve(__dirname, './src')
    }

  }
}
