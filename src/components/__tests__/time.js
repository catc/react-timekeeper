import { shallow, mount } from 'enzyme';
import React from 'react'

import { Time } from '../Time';
import renderer from 'react-test-renderer'

const HOUR_SELECT_BUTTON = '.react-timekeeper__hour-select'
const MINUTE_SELECT_BUTTON = '.react-timekeeper__minute-select'
const MERIDIEM_TOGGLE = '.react-timekeeper__meridiem-toggle'

jest.mock('../TimeDropdown', () => (props => <div className={`time-dropdown-${props.type}`}></div>) )

describe('Time component', () => {
	const changeUnit = jest.fn()

	describe('current unit is hour', () => {
		const unit = 'hour'
		const timeRendered = mount(
			<Time
				config={{}}
				unit={unit}
				changeUnit={changeUnit}
				// props to suppress proptypes warnings
				meridiem='am'
				changeMeridiem={jest.fn()}
			/>
		)

		test('minute is selected', () => {
			timeRendered.find(MINUTE_SELECT_BUTTON).simulate('click');
			expect(changeUnit).lastCalledWith('minute');
		})

		// should open TimeDropdown
		test('hour is selected', () => {
			timeRendered.find(HOUR_SELECT_BUTTON).simulate('click');
			expect( timeRendered.find(`.time-dropdown-${unit}`).length ).toEqual(1);
		})
	})

	describe('current unit is minute', () => {
		const unit = 'minute'
		const timeRendered = mount(
			<Time
				config={{}}
				unit={unit}
				changeUnit={changeUnit}
				// props to suppress proptypes warnings
				meridiem='am'
				changeMeridiem={jest.fn()}
			/>
		)

		test('hour is selected', () => {
			timeRendered.find(HOUR_SELECT_BUTTON).simulate('click');
			expect(changeUnit).lastCalledWith('hour');
		})

		// should open TimeDropdown
		test('minute is selected', () => {
			timeRendered.find(MINUTE_SELECT_BUTTON).simulate('click');
			expect( timeRendered.find(`.time-dropdown-${unit}`).length ).toEqual(1);
		})
	})

	test('change meridiem', () => {
		const changeMeridiem = jest.fn()
		let timeRendered = shallow(
			<Time
				config={{}}
				meridiem='am'
				changeMeridiem={changeMeridiem}
				// props to suppress proptypes warnings
				unit='hour'
				changeUnit={jest.fn()}
			/>
		)
		timeRendered.find(MERIDIEM_TOGGLE).simulate('click');
		expect(changeMeridiem).lastCalledWith('pm');

		timeRendered = shallow(
			<Time
				config={{}}
				meridiem='pm'
				changeMeridiem={changeMeridiem}
				// props to suppress proptypes warnings
				unit='hour'
				changeUnit={jest.fn()}
			/>
		)
		timeRendered.find(MERIDIEM_TOGGLE).simulate('click');
		expect(changeMeridiem).lastCalledWith('am');
	})

	test('should render correctly', () => {
		const tree = renderer.create(
			<Time
				config={{}}
				meridiem='pm'
				changeMeridiem={jest.fn()}
				unit='hour'
				changeUnit={jest.fn()}
			/>
		).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
