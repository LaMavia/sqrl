const path = require("path")
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')

function fromRoot(...paths) {
	return path.resolve(__dirname, ...paths)
}

module.exports = {
	mode: "development",
	entry: "./client/src/index.tsx",
	output: {
		path: fromRoot("client/assets/js/"),
		filename: "bundle.js",
		publicPath: fromRoot("client/assets/")
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [fromRoot("client/src/")],
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
  ]
}
