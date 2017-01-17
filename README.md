# Keep timepicker
Time picker based on the style of the google keep app.

### TODO
- add build script
- add css loading
- add eslint
- public to npm
	- add .npmignore
	- add script to copy everything to lib

### Possible stuff for troubleshooting
Might need to add following to `.babelrc`
```json
{
	"presets": ["es2015", "react"],
	"plugins": ["transform-object-rest-spread"],
	"env": {
		"development": {
			"presets": ["react-hmre"]
		}
	}
}
```