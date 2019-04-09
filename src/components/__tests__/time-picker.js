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

		test('with am-time passed in', () => {
			const tree = renderer.create(
				<Timepicker
					time="6:42 am"
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})

		test('with pm-time passed in, but rendered in 24-hours mode', () => {
			const tree = renderer.create(
				<Timepicker
					time="11:56 pm"
					hourMode={'hour24'}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})

		test('with 24-hours time passed in, but rendered in am/pm mode', () => {
			const tree = renderer.create(
				<Timepicker
					time="17:04"
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})

		test('with 24-hours time passed in, and rendered in 24-hours mode', () => {
			const tree = renderer.create(
				<Timepicker
					time="17:04"
					hourMode={'hour24'}
				/>
			).toJSON()
			expect(tree).toMatchSnapshot()
		})
	})
})