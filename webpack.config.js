const path = require("path");
// HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Copies individual files or entire directories, which already exist, to the build directory.
const CopyPlugin = require("copy-webpack-plugin");
// A webpack plugin to remove/clean your build folder(s)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    form: path.join(__dirname, "src/form/form.js"),
    topbar: path.join(__dirname, "src/assets/javascripts/topbar.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename: 'form.html',
      template: path.join(__dirname, "./src/form/form.html"),
      chunks: ["form", "topbar"]
    }),
    new CopyPlugin([
      { from: './src/assets/images/*', to: 'assets/images', flatten: true }
    ])
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: false,
    contentBase: "./dist",
    inline: true,
    port: 4000
  }
};