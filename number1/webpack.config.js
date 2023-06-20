const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:3001/", // 원격 module이 위치한 url 설정
  },
  mode: "development",
  devServer: {
    port: 3001,
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
      name: "Number1",
      filename: "remoteEntry.js", // convention
      exposes: {
        "./Header": "./src/components/Header.js", // 노출시킬 원격 module 설정
      },
    }),
  ],
};
