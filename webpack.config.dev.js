const { merge } = require("webpack-merge");
const config = require("./webpack.config");
const path = require('path');
require('dotenv').config()

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: process.env.LOCAL_PORT,
  },
 
});