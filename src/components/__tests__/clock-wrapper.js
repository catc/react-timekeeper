import { shallow } from 'enzyme';
import React from 'react'
import renderer from 'react-test-renderer'

import { ClockWrapper } from '../ClockWrapper';

describe('ClockWrapper component', () => {
	const hour = 12;
	const minute = 30;
	const unit = 'hour';

	const changeHour = jest.fn();
	const changeMinute = jest.fn();
	const changeMeridiem = jest.fn();

	test('renders correctly', () => {
		const tree = renderer.create(
			<ClockWrapper
				config={{}}
				unit={unit}
				hour={hour}
				minute={minute}
				meridiem="pm"
				changeHour={changeHour}
				changeMinute={changeMinute}
				changeMeridiem={changeMeridiem}
			/>
		).toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('triggers change meridiem', () => {
		const rendered = shallow(
			<ClockWrapper
				config={{}}
				unit={unit}
				hour={hour}
				minute={minute}
				meridiem="pm"
				changeHour={changeHour}
				changeMinute={changeMinute}
				changeMeridiem={changeMeridiem}
			/>
		)
		rendered.find('button.type_am').simulate('click');
		expect(changeMeridiem).lastCalledWith('am');

		rendered.find('button.type_pm').simulate('click');
		expect(changeMeridiem).lastCalledWith('pm');
	})
})