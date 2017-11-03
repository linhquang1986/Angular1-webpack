const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  entry: void 0,
  output: {},
  devtool: "inline-source-map",

  devServer: {
    contentBase: path.join(__dirname, "app"), // boolean | string | array, static file location
    port: 9000,
    open: true,
    compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false // true for self-signed, object for cert authority
    // noInfo: true // only errors & warns on hot reload
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "istanbul-instrumenter-loader",
        query: {
          esModules: true
        }
      },
      {
        test: /\.css$/,
        use: "null-loader"
      },
      {
        test: /\.scss$/,
        use: "null-loader"
      }
    ]
  }
});
