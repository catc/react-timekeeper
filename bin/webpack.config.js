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
			// JUST TS
			// {
			// 	test: /\.(j|t)sx?$/,
			// 	exclude: [/node_modules/],
			// 	loader: 'awesome-typescript-loader',
			// },

			/*
				TODO
				- DONE see if need to check for hot inside app
				- remove awesome-typescript-loader from dependencies
				- see if need polyfill
				- DONE see if need class properties
			*/
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
			// TODO - add scss
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
