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
						"not op_mini all",
						"not dead"
					]
				}
			}
		],
		"@babel/preset-typescript",
		["@babel/preset-react", {
			"runtime": "automatic",
			"importSource": "@emotion/react"
		}],
	],
	"plugins": [
		"@emotion/babel-plugin"
	]
}

if (!isProd){
	config.plugins.push('react-hot-loader/babel')
}

module.exports = config