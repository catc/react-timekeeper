import React from 'react'
import renderer from 'react-test-renderer'

import { Timepicker } from '../Timepicker';

describe('Timepicker component', () => {
	describe('renders correctly', () => {

		test('with no time', () => {
			const tree = renderer.create(
				<Timepicker/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})

		test('with time passed in', () => {
			const tree = renderer.create(
				<Timepicker
					time="6:42"
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
	})
})