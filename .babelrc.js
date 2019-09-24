const isProd = process.env.NODE_ENV === 'production'

const config = {
	"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"browsers": [
						">0.5%",
						"not ie 11",
						"not op_mini all"
					]
				}
			}
		],
		"@babel/preset-typescript",
		"@babel/preset-react",
		"@emotion/babel-preset-css-prop"
	],
	"plugins": [
		'@babel/plugin-transform-runtime',
		[
			"@babel/plugin-proposal-class-properties",
			{
				"loose": true
			},
		]
	]
}

if (!isProd){
	config.plugins.push('react-hot-loader/babel')
}

module.exports = config