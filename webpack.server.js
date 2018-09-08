// @ts-check

const path = require("path")
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function fromRoot(...paths) {
	return path.resolve(__dirname, ...paths)
}

module.exports = {
  target: "node",
	mode: "production",
	entry: "./server/app.ts",
	output: {
		path: fromRoot("server/"),
		filename: "app.js",
		publicPath: fromRoot("server/")
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json", ".mjs", ".mts"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [fromRoot("server/")],
				exclude: [fromRoot("node_modules/")],
				loader: "awesome-typescript-loader"
			}
		]
	},
	// externals: {
	// 	react: "React",
	// 	"react-dom": "ReactDOM"
	// },
  plugins: [
		new CheckerPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
        parallel: true
      })
    ]
  }
}
