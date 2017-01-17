const webpack = require('webpack');
const path = require('path');

const webpackConfig = require('../webpack.config.js')

const port = 3002
const WebpackDevServer = require('webpack-dev-server')

// var webpackConfig = require('../webpack.config.js')
let docs = Object.create(webpackConfig)
// let docs = webpackConfig

docs.entry = ['webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server', docs.entry[0]]

docs.module.loaders[0].loaders.unshift('react-hot-loader')
docs.module.loaders[1].loaders.unshift('react-hot-loader')

docs.devtool = 'eval'
docs.debug = true

console.log( '---------------' )
console.log( docs )
console.log( '---------------' )
new WebpackDevServer(webpack(docs), {
	// publicPath: '/' + docs.output.publicPath,
	publicPath: '/build/',
	contentBase: 'docs',
	// publicPath: '/docs/',
	hot: true,
	stats: {
		cached: false,
		cachedAssets: false,
		colors: true,
		exclude: ['node_modules', 'components'],
	},
}).listen(port, 'localhost', err => {
	if (err) throw new Error('webpack-dev-server', err)
	console.log('[webpack-dev-server]', 'http://localhost:' + port + '/')
})