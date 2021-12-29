import Text from '../components/text'
import Link from '../components/link'
import Code, { SYNTAX } from '../components/code'

export default function Intro() {
	return (
		<section className="api docs-section" id="api">
			<h2>API</h2>

			{/* time */}
			<h3 className="h3-api">
				<code className="name">time</code>
				<span className="accepts">TimeInput</span>(default:{' '}
				<code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>Time to set on component. Accepts time in 4 formats:</Text>
				<Code type={SYNTAX.js}>{`// TimeInput
			
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
}`}</Code>
			</div>

			{/* onchange */}
			<h3 className="h3-api">
				<code className="name">onChange</code>
				<span className="accepts">(TimeOutput) {`=>`} void</span>(default:{' '}
				<code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>
					Pass a function to be called when time is changed. Used to update time
					state in parent component. Function called returns object with updated
					time.
				</Text>
				<Code type={SYNTAX.js}>{`// TimeOutput
{
	formatted24: '16:55',    // 24 hour format
	formatted12: '4:55 pm',  // 12 hour mode
	formattedSimple: '4:55', // similar to formatted (12h), but no meridiem
	hour: 16,                // 24 hour
	hour12: 4,
	minute: 55,
	meridiem: 'pm',
	isValid: boolean,        // requires \`disabledTimeRange\`, false if time selected is blocked off
}`}</Code>
			</div>

			{/* hour24Mode */}
			<h3 className="h3-api">
				<code className="name">hour24Mode</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>

			<div className="api__description">
				<Text>Set hour mode to 24 hours</Text>
			</div>

			{/* switchToMinuteOnHourSelect */}
			<h3 className="h3-api">
				<code className="name">switchToMinuteOnHourSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>

			<div className="api__description">
				<Text>
					Changes clock unit from hour to minute after selecting an hour. Exists
					mainly to provides a better user experience.
				</Text>
			</div>
			{/* switchToMinuteOnHourDropdownSelect */}
			<h3 className="h3-api">
				<code className="name">switchToMinuteOnHourDropdownSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>

			<div className="api__description">
				<Text>
					Changes clock unit from hour to minute after selecting an hour via the
					dropdown.
				</Text>
			</div>

			{/* closeOnMinuteSelect */}
			<h3 className="h3-api">
				<code className="name">closeOnMinuteSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>

			<div className="api__description">
				<Text>
					Whether or not to trigger &quot;Done&quot; button click when the user
					selects minutes. Similar to Google Keep functionality, where once the
					selects hour and minute, the picker automatically closes.
				</Text>
			</div>

			{/* coarseMinutes */}
			<h3 className="h3-api">
				<code className="name">coarseMinutes</code>
				<span className="accepts">number</span>(default:{' '}
				<code className="default">5</code>)
			</h3>

			<div className="api__description">
				<Text>
					When roughly tapping minutes (ie: not dragging the cursor), rounds
					selected number to increments (eg, tapping on 23 will round to 25). Is
					especially useful for mobile. Set to 1 if you wish to avoid this
					feature.
				</Text>
			</div>

			{/* forceCoarseMinutes */}
			<h3 className="h3-api">
				<code className="name">forceCoarseMinutes</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>

			<div className="api__description">
				<Text>
					Forces minutes to always round to <Code inline>coarseMinutes</Code>{' '}
					value - even when dragging clockhand.
				</Text>
			</div>

			{/* onDoneClick */}
			<h3 className="h3-api">
				<code className="name">onDoneClick</code>
				<span className="accepts">
					(TimeOutput, Event) {`=>`} void
				</span>(default: <code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>
					Displays the &quot;Done&quot; button and calls function when button is
					clicked. Useful for triggering some action on the parent component,
					like closing the timepicker.
				</Text>
			</div>

			{/* doneButton */}
			<h3 className="h3-api">
				<code className="name">doneButton</code>
				<span className="accepts">(TimeOutput) {`=>`} React.ReactNode</span>
				(default: <code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>Custom done button as render props. See below for example.</Text>
			</div>

			{/* disabledTimeRange */}
			<h3 className="h3-api">
				<code className="name">disabledTimeRange</code>
				<span className="accepts">{`{ from: string, to: string }`}</span>(default:{' '}
				<code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>
					Blocks off time range. From and to accepts 24hr formatted strings only
					(eg: 16:20), regardless of 12h or 24h mode. Disabled times are
					exclusive, eg: <code>{`{ from: 6:30, to: 8:40 }`}</code> allows
					selecting 6:30 (but not 6:31+) and 8:40 (but not 8:39 or earlier).
					<br />
					<br />
					Additional validation should be handled by your own app since there
					are cases where user can select blocked off times, eg: if{' '}
					<code>from: 6:30</code>, can select 5:45, then change hour to 6
					resulting in 6:30 (which is blocked). For these cases, you can use{' '}
					<code>TimeOutput.isValid</code> to determine if time is valid.
				</Text>
			</div>

			{/* custom styles */}
			<h3 className="h3-api">
				<code className="name">custom styling</code>
			</h3>

			<div className="api__description">
				<Text>
					<Link samePage href="#custom-styles">
						See below for examples
					</Link>
				</Text>
			</div>
		</section>
	)
}
