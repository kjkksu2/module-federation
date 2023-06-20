const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },
  mode: "development",
  devServer: {
    port: 3002,
    hot: true,
    static: { directory: path.join(__dirname, "./dist") },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: { overlay: true },
    liveReload: true,
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      index: "index.html",
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "Number2",
      remotes: {
        Number1: "Number1@http://localhost:3001/remoteEntry.js",
      },
    }),
  ],
};
