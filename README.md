# Keep timepicker
Time picker based on the style of the [Android Google Keep](https://play.google.com/store/apps/details?id=com.google.android.keep) app.

### TODO
- public to npm
	- add .npmignore
	- add script to copy everything to lib
- update package.json
	- packages
- tests
	- https://semaphoreci.com/community/tutorials/snapshot-testing-react-components-with-jest


## API
Timepickeer component props:

#### `time` (string/object)
Time to set on component. Accepts time in 4 formats: 

```javascript
// string with meridiem
'4:55 pm'

// string without meridiem (assumes a 24 hour format)
'16:55'

// object with meridiem
{
	hour: 4,
	minute: 55,
	meridiem: 'pm'
}

// object without meridiem (assumes a 24 hour format)
{
	hour: 16,
	minute: 55
}
```

#### `onChange` (function)
Pass a function to be called when time is changed. Used to store time state in parent component. Function called returns object with updated time:

```javascript
{
	formatted: '4:55 pm',	// 12 hour
	formattedSimple: '4:55', 	// similar to formatted (12h), but no meridiem
	formatted24: '16:55',
	hour: 4,
	hour24: 16,
	minute: 55,
	meridiem: 'pm'
}
```

#### `showDoneButton` (bool)
Whether or not to display "Done" button on bottom of component. Also need to pass in a `onDoneButtonClick` function.

#### `onDoneButtonClick` (function)
Function that is called when "Done" button is clicked. Useful for triggering some action on the parent component, like closing the timepicker.

#### `switchToMinuteOnHourSelect` (bool)
Changes clock unit from hour to minute after selecting an hour. Exists mainly to provides a better user experience.

#### `closeOnMinuteSelect` (bool)
Whether or not to trigger "Done" button click when the user selects minutes. Similar to Google Keep functionality, where once the selects hour and minute, the picker automatically closes.

#### `hourFormat` (number)
Hour format - accepts either `12` (default) or `24`.
