const webpack = require('webpack');
const path = require('path');

const config = require('../webpack.config.js')

const port = 3002
const devServer = require('webpack-dev-server')

let docs = config

docs.entry = [
	'webpack-dev-server/client?http://localhost:' + port,
	'webpack/hot/dev-server',
	docs.entry[0]
]

docs.module.loaders[0].loaders.unshift('react-hot-loader')
docs.module.loaders[1].loaders.unshift('react-hot-loader')

docs.devtool = 'eval'
docs.debug = true

new devServer(webpack(docs), {
	publicPath: '/build/',
	contentBase: './docs',

	hot: true,
	stats: {
		cached: false,
		cachedAssets: false,
		colors: true,
		exclude: ['node_modules', 'components'],
	},
}).listen(port, '0.0.0.0', err => {
	if (err) throw new Error('webpack-dev-server', err)
	console.log('[webpack-dev-server]', 'http://localhost:' + port + '/')
})