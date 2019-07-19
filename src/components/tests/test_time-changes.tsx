// import React from 'react'

import { HourNumbers, MinuteNumbers } from '../Numbers'
import Meridiems from '../Meridiems'

import './setup'
import { mockAnimations, triggerMouseClick, renderTK } from './utils'
import { HOUR_12_INNER, HOUR_24_OUTER, HOUR_3_INNER, HOUR_3_OUTER } from './click-data'

/*
	TODO
	- test minutes
	- test coarse minutes + hours
*/

describe('handles events correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('updates hours', () => {
		function testHoursFor12hMode(coords: any, expectedHour: number) {
			const { onChange, wrapper } = renderTK()

			triggerMouseClick(wrapper, coords)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: expectedHour,
				}),
			)
		}
		test('handles click on "3" during 12h mode', () => {
			testHoursFor12hMode(HOUR_3_OUTER, 3)
			testHoursFor12hMode(HOUR_3_INNER, 3)
		})

		test('handles click on "12" during 12h mode', () => {
			testHoursFor12hMode(HOUR_24_OUTER, 0)
			testHoursFor12hMode(HOUR_24_OUTER, 0)
		})

		function testHoursFor24hMode(coords: any, expectedHour: number) {
			const { onChange, wrapper } = renderTK({ hour24Mode: true })

			triggerMouseClick(wrapper, coords)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: expectedHour,
				}),
			)
		}

		// check correct time is output when clicking on inner or outer
		test('handles outer click on "3" during 24h mode', () => {
			testHoursFor24hMode(HOUR_3_OUTER, 15)
		})
		test('handles inner click on "3" during 24h mode', () => {
			testHoursFor24hMode(HOUR_3_INNER, 3)
		})
		test('handles outer click on "12" during 24h mode', () => {
			testHoursFor24hMode(HOUR_24_OUTER, 0)
		})
		test('handles inner click on "12" during 24h mode', () => {
			testHoursFor24hMode(HOUR_12_INNER, 12)
		})
	})

	test('it changes from hours -> minutes on minute select', () => {
		const { wrapper } = renderTK({ switchToMinuteOnHourSelect: true })

		expect(wrapper.find(HourNumbers).length).toEqual(1)

		triggerMouseClick(wrapper, {
			clientX: 150,
			clientY: 35,
		})
		expect(wrapper.find(MinuteNumbers).length).toEqual(1)
	})

	test('handles meridiem clicks correctly', () => {
		const { onChange, wrapper } = renderTK({ time: { hour: 2, minute: 0 } })

		wrapper
			.find(Meridiems)
			.find('button')
			.at(1)
			.simulate('click')

		// gotta wait for debounced onChange fn to trigger
		jest.runAllTimers()

		expect(onChange).toBeCalledTimes(1)
		expect(onChange).toBeCalledWith(
			expect.objectContaining({
				hour: 14,
			}),
		)
	})
})
