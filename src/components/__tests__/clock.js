import React from 'react'
import renderer from 'react-test-renderer'

import { Clock } from '../Clock';

describe('Clock component', () => {
	const hour = 4;
	const hour24 = 14;
	const minute = 42;

	const changeHour = jest.fn();
	const changeMinute = jest.fn();

	describe('renders correctly', () => {
		test('when unit is hour', () => {
			const unit = 'hour';
			const tree = renderer.create(
				<Clock
					config={{}}
					unit={unit}
					hour={hour}
					minute={minute}
					changeHour={changeHour}
					changeMinute={changeMinute}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
		test('when unit is hour24', () => {
			const unit = 'hour24';
			const tree = renderer.create(
				<Clock
					config={{}}
					mode={'hour24'}
					unit={unit}
					hour24={hour24}
					minute={minute}
					changeHour={changeHour}
					changeMinute={changeMinute}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
		test('when unit is minute', () => {
			const unit = 'minute';
			const tree = renderer.create(
				<Clock
					config={{}}
					unit={unit}
					hour={hour}
					minute={minute}
					changeHour={changeHour}
					changeMinute={changeMinute}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
	})
})