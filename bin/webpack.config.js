const { resolve, join } = require('path')

global.appRoot = resolve(__dirname, '../')

const config = {
	entry: './docs/js/index.tsx',
	output: {
		// path: path.resolve(__dirname, 'dist'),
		path: join(global.appRoot, '/docs/build'),
		filename: 'bundle.js',
		publicPath: 'build/',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
							[
								'@babel/preset-env',
								{ targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
							],
							'@babel/preset-typescript',
							'@babel/preset-react',
						],
						plugins: [
							// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
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

	// TODO - might need to add this plugin for baseUrl + paths support
	// https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
	// const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
	// new TsConfigPathsPlugin(/* { configFileName, compiler } */)
	plugins: [],

	// externals: {
	// 	react: 'React',
	// 	'react-dom': 'ReactDOM',
	// },
}

module.exports = config
