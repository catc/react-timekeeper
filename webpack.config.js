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
				loaders: [
					'babel-loader',
					__dirname + '/code-loader'
				],
			}, {
				// overwritten in build script with extract-text-plugin
				test: /\.(s?)css$/,
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
			'react-timekeeper': path.resolve(__dirname, './src/index.js')
		},
		extensions: ['', '.js', '.jsx'],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({
			quiet: true
		}),
		// new webpack.NoErrorsPlugin(),
	],
	quiet: true
}
