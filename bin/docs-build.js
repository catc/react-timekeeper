'use strict'

const webpack = require('webpack')
const config = require('../webpack.config.js')
const build = Object.create(config)

const ExtractTextPlugin = require('extract-text-webpack-plugin');

build.module.loaders.pop()
build.module.loaders.push({
	test: /\.(s?)css$/,
	loaders: [ExtractTextPlugin.extract('style-loader'), 'css-loader', 'postcss-loader', 'sass-loader']
})

build.postcss = () => {
	return [
		require('autoprefixer')({
			browsers: [
				'> 1%',
				'Safari 8',
				'Last 2 versions'
			]
		})
	];
}


build.plugins = [
	new ExtractTextPlugin('style.css'),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
		},
		output: {
			comments: false
		}
	})
]

webpack(build, (err, stats) => {
	if (err) throw new Error('webpack-dev-server', err)
})
