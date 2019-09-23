import React, { useState } from 'react'
import Timekeeper from '@tk'

import Text from '../components/text'
import Code, { SYNTAX } from '../components/code'

export default function Examples() {
	const [time1, setTime1] = useState('12:34pm')
	const [time2, setTime2] = useState('12:34pm')
	const [displayExample2, setDisplayExample2] = useState(true)
	const [time3, setTime3] = useState('12:45pm')

	return (
		<section className="examples docs-section" id="examples">
			<h2>Examples</h2>

			{/* example 1 */}
			<div className="examples__item">
				<Text>
					Basic example demonstrating passing in <code>time</code> and updating time on
					parent component via <code>onChange</code> function.
				</Text>

				<div className="examples__example-1">
					<div className="examples__example-1-timekeeper-wrapper">
						<Timekeeper time={time1} onChange={(data) => setTime1(data.formatted12)} />
					</div>
					<span className="examples__example-1-time">Time is {time1}</span>
				</div>

				<Code type={SYNTAX.js}>{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function YourComponent(){
	const [time, setTime] = useState('12:34pm')
	
	return (
		<div>
		<Timekeeper
		time={time}
		onChange={(data) => setTime(data.formatted12)}
		/>
		<span>Time is {time}</span>
		</div>
		)
		
}`}</Code>
			</div>

			{/* example 2 */}
			<div className="examples__item">
				<Text>
					Change unit to minutes after selecting hour, and close time picker on clicking
					"done" button.
				</Text>

				<div className="examples__example-2">
					{displayExample2 && (
						<div className="examples__example-2-timekeeper-wrapper">
							<Timekeeper
								time={time2}
								onChange={(data) => setTime2(data.formatted12)}
								onDoneClick={() => setDisplayExample2(false)}
								switchToMinuteOnHourSelect
							/>
						</div>
					)}
					<span className="examples__example-2-time">
						Time is {time2}
						{!displayExample2 && (
							<span
								className="examples__example-2-open"
								onClick={() => setDisplayExample2(true)}
							>
								Open
							</span>
						)}
					</span>
				</div>

				<Code type={SYNTAX.js}>{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function YourComponent(){
	const [time, setTime] = useState('12:34pm')
	const [showTime, setShowTime] = useState(true)

	return (
		<div>
			{showTime &&
				<Timekeeper
					time={time}
					onChange={(data) => setTime(data.formatted12)}
					onDoneClick={() => setShowTime(false)}
					switchToMinuteOnHourSelect
				/>
			}
			<span>Time is {time}</span>
			{!showTime &&
				<button onClick={() => setShowTime(true)}>Show</button>
			}
		</div>
	)

}`}</Code>
			</div>

			{/* example 3 */}
			<div className="examples__item">
				<Text>Force 15 minute only increments.</Text>

				<div className="examples__example-3">
					<div className="examples__example-3-timekeeper-wrapper">
						<Timekeeper
							time={time3}
							onChange={(data) => setTime3(data.formatted12)}
							forceCoarseMinutes
							coarseMinutes={15}
						/>
					</div>
					<span className="examples__example-1-time">Time is {time3}</span>
				</div>

				<Code type={SYNTAX.js}>{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function YourComponent(){
	const [time, setTime] = useState('12:34pm')
	
	return (
		<div>
			<Timekeeper
				time={time}
				onChange={(data) => setTime(data.formatted12)}
				coarseMinutes={15}
				forceCoarseMinutes
			/>
			<span>Time is {time}</span>
		</div>
	)
		
}`}</Code>
			</div>

			{/* example 3 */}
			<div className="examples__item">
				<Text>24 hour mode and force 15 minute only increments.</Text>

				<div className="examples__example-3">
					<div className="examples__example-3-timekeeper-wrapper">
						<Timekeeper
							time={time3}
							onChange={(data) => setTime3(data.formatted12)}
							switchToMinuteOnHourSelect
							hour24Mode
							forceCoarseMinutes
							coarseMinutes={15}
						/>
					</div>
					<span className="examples__example-1-time">Time is {time3}</span>
				</div>

				<Code type={SYNTAX.js}>{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function YourComponent(){
	const [time, setTime] = useState('12:34pm')
	
	return (
		<div>
			<Timekeeper
				time={time}
				onChange={(data) => setTime(data.formatted12)}
				hour24Mode
				coarseMinutes={15}
				forceCoarseMinutes
			/>
			<span>Time is {time}</span>
		</div>
	)
		
}`}</Code>
			</div>
		</section>
	)
}
