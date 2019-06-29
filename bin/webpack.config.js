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
						babelrc: false,
						presets: [
							['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
							'@babel/preset-typescript',
							'@babel/preset-react',
						],
						plugins: [
							// ["@babel/plugin-proposal-decorators", { legacy: true }],
							['@babel/plugin-proposal-class-properties', { loose: true }],
							'react-hot-loader/babel',
						],
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
