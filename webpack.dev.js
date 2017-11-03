const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

//analyzer bundle
const ANALYZER = process.env.npm_config_analyzer || false;
const SITE_TYPE = process.env.npm_config_sitetype || "testing";

let config = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js"
  },

  devtool: "source-map",

  devServer: {
    contentBase: path.join(__dirname, "app"), // boolean | string | array, static file location
    port: 8000,
    open: true,
    compress: true, // enable gzip compression
    // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false // true for self-signed, object for cert authority
    // noInfo: true // only errors & warns on hot reload
  },
  performance: {
    hints: "warning"
  },

  module: {
    rules: [
      {
        test: /\.css$/,

        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { root: path.resolve(__dirname, "app"), sourceMap: true }
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
              options: { root: path.resolve(__dirname, "app"), sourceMap: true }
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
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "[name].style.css"
    }),
    new webpack.DefinePlugin({
      SITETYPE_PLACEHOLDER_WEBPACK: JSON.stringify(SITE_TYPE)
    })
  ],
  stats: {
    // Add children information
    children: true,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: true,
    // Add built modules information to chunk information
    chunkModules: true,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: true,
    // Add timing information
    timings: true
  }
};

if (ANALYZER) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, config);
