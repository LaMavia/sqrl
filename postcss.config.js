module.exports = ctx => {
  const isProd = ctx.env === "production"

	return {
		map: false,
		parser: false,
		plugins: [
			require("postcss-import")({ root: ctx.file.dirname }),
			require("rucksack-css"),
			require("precss")(),
			require('postcss-write-svg')(),
			require('postcss-at-debug')(),
			require("postcss-nested")(),
			require("postcss-utilities")(),
			require("postcss-mixins")(),
			require("postcss-pxtorem")(),
			require("postcss-extend")(),
			isProd && require("css-mqpacker"),
			isProd && require("cssnano")()
		]
	}
}
