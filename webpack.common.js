const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    vendors: ["./app/vendors"],
    main: ["babel-polyfill", "./app/index.js"],
    cores: ["angular", "angular-route"]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "app")],
    // directories where to look for modules

    extensions: [".js", ".json", ".css", ".scss"],
    // extensions that are used

    alias: {
      app: path.resolve(__dirname, "app"),
      assets: path.resolve(__dirname, "app/assets"),
      utils: path.resolve(__dirname, "app/utils"),
      components: path.resolve(__dirname, "app/components"),
      pages: path.resolve(__dirname, "app/pages"),
      vendors: path.resolve(__dirname, "app/vendors"),
      resources: path.resolve(__dirname, "app/resources"),
      factories: path.resolve(__dirname, "app/factories")
    }
  },

  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "app"),
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              root: path.resolve(__dirname, "app")
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: "10240", //if size less than 10kb, will be convert into base64 inline, else use file-loader
              name: "[path][name].[ext]"
            }
          }
        ]
      },

      {
        //make jquery global in window browser
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "$"
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      template: "app/index.html",
      inject: "head",
      hash: true,
      showErrors: true
    }),

    new webpack.ProvidePlugin(
      //make jquery global
      {
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _: "lodash"
      }
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: "cores",
      minChunks: Infinity
    })
  ]
};
