import { shallow } from 'enzyme';
import React from 'react'
import renderer from 'react-test-renderer'

import { ClockWrapper } from '../ClockWrapper';

describe('ClockWrapper component', () => {
	const hour = 12;
	const hour24 = 16;
	const minute = 30;
	const unit = 'hour';
	const unit24 = 'hour24';

	const changeHour = jest.fn();
	const changeMinute = jest.fn();
	const changeMeridiem = jest.fn();

	describe('renders correctly', () => {
		test('when unit is hour', () => {
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
		test('when unit is hour24', () => {
			const tree = renderer.create(
				<ClockWrapper
					config={{}}
					unit={unit24}
					hour24={hour24}
					minute={minute}
					changeHour={changeHour}
					changeMinute={changeMinute}
					// props to suppress proptypes warnings
                    meridiem="pm"
					changeMeridiem={changeMeridiem}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
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