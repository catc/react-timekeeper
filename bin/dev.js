const config = require('./webpack.config.js')
const webpack = require('webpack')
const devServer = require('webpack-dev-server')

const PORT = 3002

// update config
config.mode = 'development'
config.devtool = 'source-map'
config.plugins.push(new webpack.HotModuleReplacementPlugin())

new devServer(webpack(config), {
	publicPath: '/build/',
	contentBase: './docs',
	hot: true,
	stats: 'errors-warnings',
}).listen(PORT, '0.0.0.0', (err) => {
	if (err) {
		console.error('ERROR :: ', err)
	}
})
