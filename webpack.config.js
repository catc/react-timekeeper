const webpack = require('webpack');
const path = require('path');

// const libName = 'mylib'
module.exports = {
	// context: __dirname + '/src',
	// entry: './index.js',
	entry: ['./docs/js/index.js'],

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
