const { resolve } = require('path')

global.appRoot = resolve(__dirname, '../')

const config = {
	entry: './docs/js/index.tsx',
	output: {
		path: global.appRoot + '/docs/build',
		filename: 'bundle.js',
		publicPath: 'build/',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@tk': resolve(global.appRoot, './src/index.ts'),
			// https://github.com/hot-loader/react-dom#webpack
			'react-dom': '@hot-loader/react-dom',
		},
	},

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				// overwritten in build script with extract-text-plugin
				test: /\.(s?)css$/,
				loaders: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [require('autoprefixer')()],
						},
					},
					'sass-loader',
				],
			},
		],
	},

	plugins: [],
}

module.exports = config
