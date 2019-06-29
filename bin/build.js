const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./webpack.config.js')

const BR = '----------------------'
const COLORS = {
	RED: '\x1b[31m',
	YELLOW: '\x1b[33m',
	RESET: '\x1b[0m',
}

// update config
config.mode = 'production'
config.module.rules[1] = {
	test: /\.(s?)css$/,
	loaders: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: (resourcePath, context) => {
					// publicPath is the relative path of the resource to the context
					// e.g. for ./css/admin/main.css the publicPath will be ../../
					// while for ./css/main.css the publicPath will be ../
					return path.relative(path.dirname(resourcePath), context) + '/'
				},
			},
		},
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [require('autoprefixer')(), require('cssnano')()],
			},
		},
		'sass-loader',
	],
}
config.plugins.push(
	new MiniCssExtractPlugin({
		filename: 'style.css',
	}),
)

// build
webpack(config, (err, stats) => {
	if (err) {
		throw new Error('WEBPACK BUILD ERROR ::', err)
	}
	console.log(`Successfully built bundle in "${config.output.path}"`)

	// handle errors + warnings
	const info = stats.toJson()
	if (stats.hasErrors()) {
		console.log(`\n${COLORS.RED}:: ERRORS ::${COLORS.RESET}`)
		info.errors &&
			info.errors.length &&
			info.errors.map((w) => {
				console.error(`${BR}\n`, w)
			})
	}
	if (stats.hasWarnings()) {
		console.log(`\n${COLORS.YELLOW}:: WARNINGS ::${COLORS.RESET}`)
		info.warnings &&
			info.warnings.length &&
			info.warnings.map((w) => {
				console.error(`${BR}\n`, w)
			})
	}

	// log stats
	const fin = stats.toString({
		chunks: true,
		colors: true,
		modules: false,
		chunkModules: false,
	})
	console.log(`${BR}\n\n`, fin)
})
