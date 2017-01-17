const webpack = require('webpack');
const path = require('path');

// const libName = 'mylib'
const webpackConfig = {
	// context: __dirname + '/src',
	// entry: './index.js',
	entry: ['./docs/index.js'],

	output: {
		path: path.join(__dirname, 'docs/build'),
		filename: 'bundle.js',
		publicPath: 'docs/build/',
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				loaders: ['babel-loader'],
			}, {
				test: /\.jsx$/,
				exclude: [/node_modules/],
				loaders: ['babel-loader'],
			}
		]
	},
	resolve: {
		alias: {
			'react': path.resolve(__dirname, './node_modules/react'),
			// 'src': path.resolve(__dirname, './src'),
			'keep-timepicker': path.resolve(__dirname, './src/index.js')
		},
		extensions: ['', '.js', '.jsx'],
		// fallback: [path.resolve(__dirname, './somewhere')]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({
			// quiet: true
		}),
		// new webpack.NoErrorsPlugin(),
	],
}

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