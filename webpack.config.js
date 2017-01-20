const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: [
		'./docs/js/index.js',
	],

	output: {
		path: path.join(__dirname, '/docs/build'),
		filename: './bundle.js',
		publicPath: 'build/'
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
			}, {
				// overwritten in build script with extract-text-plugin
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
		]
	},
	postcss: () => {
		return [
			require('autoprefixer')()
		];
	},
	resolve: {
		alias: {
			'react': path.resolve(__dirname, './node_modules/react'),
			// TODO - rename this
			'keep-timepicker': path.resolve(__dirname, './src/index.js')
		},
		extensions: ['', '.js', '.jsx'],
		// fallback: [path.resolve(__dirname, './somewhere')]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({
			quiet: true
		}),
		// new webpack.NoErrorsPlugin(),
	],
	quiet: true
}
