'use strict'

const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')

const build = Object.create(webpackConfig)
build.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
	new webpack.optimize.DedupePlugin(),
]
webpack(build, (err, stats) => {
	if (err) throw new Error('webpack-dev-server', err)
})
