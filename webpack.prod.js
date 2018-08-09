const merge = require("webpack-merge")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const base = require("./webpack.config")

module.exports = merge(base, {
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true
      })
    ]
  }
})