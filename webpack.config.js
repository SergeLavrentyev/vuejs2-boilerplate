const VueLoaderPlagin = require("vue-loader/lib/plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const PrerenderSPAPlugin = require("prerender-spa-plugin");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProduction = process.env.NODE_ENV || "production";
const resolve = file => path.resolve(__dirname, file);

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    main: resolve("src/main.js")
  },
  output: {
    path: resolve("/dist"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.less$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false
            }
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                math: "always"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "images/[name].[hash:8].[ext]"
          }
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: "file-loader",
        options: {
          filename: "[name].[ext]",
          publicPath: "./assets/images",
          outputPath: "./images/",
          esModule: false
        }
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    publicPath: "/",
    host: "0.0.0.0"
  },
  plugins: [
    new VueLoaderPlagin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: resolve("src/public/index.html"),
      publicPath: "/"
    })
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("/src"),
      "@c": resolve("/src/components")
    }
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: false,
};
