# React Timekeeper
Time picker based on the style of the [Android Google Keep](https://play.google.com/store/apps/details?id=com.google.android.keep) app. [See the demo](https://catc.github.io/react-timekeeper/).

## Installation

```shell
$ npm install --save react-timekeeper
```

## Usage

```javascript
import Timekeeper from 'react-timekeeper';

render(){
	<Timekeeper
		time={this.state.time}
		// ...
	/>
}
```

All styles are inlined via [radium](https://github.com/FormidableLabs/radium) so no css imports are required.


## API
Timepickeer component props:

#### `time` (string/object)
Time to set on component. Accepts time in 4 formats: 

```javascript
// string with meridiem
'4:55 pm'
'4:55pm'

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
	formatted: '4:55 pm',	// 12 hour format
	formattedSimple: '4:55', // similar to formatted (12h), but no meridiem
	formatted24: '16:55',
	hour: 4,
	hour24: 16,
	minute: 55,
	meridiem: 'pm'
}
```


#### `onDoneClick` (function: `newTime` , `?event`)
Displays the "Done" button and calls function when button is clicked. Useful for triggering some action on the parent component, like closing the timepicker. Called with update time and event (if button is clicked).

#### `switchToMinuteOnHourSelect` (bool)
Changes clock unit from hour to minute after selecting an hour. Exists mainly to provides a better user experience.

#### `closeOnMinuteSelect` (bool)
Whether or not to trigger "Done" button click when the user selects minutes. Similar to Google Keep functionality, where once the selects hour and minute, the picker automatically closes.

#### `config` (object)
Pass in object with any config properties to override. Currently supports overriding style properties. See [full list](https://github.com/catc/react-timekeeper/blob/master/src/helpers/config.js) of properties.

```javascript
// example
config={{
	TIMEPICKER_BACKGROUND: 'red',
	FONT_FAMILY: '"Open Sans", sans-serif'
}}

//set minutes to span to 5 minute intervals
config={{
	useCoarseMinutes: true
}}
```


## Development
1. Clone the repo
3. `nvm use 7.10` (or anything >7.6)
2. `npm install`
3. `npm run dev`
4. Navigate to `localhost:3002`

------------

- build: `npm run build`
- run all tests: `npm run test`
- update test snapshots: `npm run test:update-snapshots`
- create lib to publish npm: `npm run lib`
- run individual test: `npm run test -t SPEC_NAME`, eg: `npm run test -t compose-time` to run `compose-time.js` in `src/helpers/__tests__/compose-time.js`