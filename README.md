# Keep timepicker
Time picker based on the style of the google keep app.

### TODO
- public to npm
	- add .npmignore
	- add script to copy everything to lib
- update package.json
	- packages

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