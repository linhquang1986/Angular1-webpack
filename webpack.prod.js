const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const SITE_TYPE = process.env.npm_config_sitetype || "production";

module.exports = merge(common, {
  // entry: ["babel-polyfill", "./app/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:10].js",
    chunkFilename: "[name].[hash:10].js"
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { root: path.resolve(__dirname, "app"), minimize: true }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { root: path.resolve(__dirname, "app"), minimize: true }
            },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      filename: "[contenthash:10].style.css"
    }),
    new webpack.DefinePlugin({
      SITETYPE_PLACEHOLDER_WEBPACK: JSON.stringify(SITE_TYPE)
    })
  ]
});
