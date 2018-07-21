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
		path: fromRoot("client/dist"),
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
	externals: {
		react: "React",
		"react-dom": "ReactDOM"
	},
	devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: fromRoot("client/assets"), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
		new CheckerPlugin(),
		new webpack.HotModuleReplacementPlugin()
  ]
}
