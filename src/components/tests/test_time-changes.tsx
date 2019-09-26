// import React from 'react'

import { HourNumbers, MinuteNumbers } from '../Numbers'
import Meridiems from '../Meridiems'
import TopBar from '../TopBar'
import TimeDropdown from '../TimeDropdown'

import './helpers/setup'
import {
	mockAnimations,
	triggerMouseClick,
	renderTK,
	waitForUpdates,
	changeToMinutes,
} from './helpers/utils'
import {
	HOUR_12_INNER,
	HOUR_24_OUTER,
	HOUR_3_INNER,
	HOUR_3_OUTER,
	MINUTE_7,
	MINUTE_23,
	MINUTE_59,
} from './helpers/click-data'

/*
	TODO
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

	describe('updates minutes', () => {
		function testMinutes(coords: any, expectedMinute: number, opts: any = {}) {
			const { onChange, wrapper } = renderTK(opts)

			changeToMinutes(wrapper)
			triggerMouseClick(wrapper, coords)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					minute: expectedMinute,
				}),
			)
		}
		test('handles click on "15"', () => {
			testMinutes(HOUR_3_OUTER, 15)
		})
		test('handles click on "15"', () => {
			testMinutes(HOUR_12_INNER, 0)
		})
		test('handles coarse minutes', () => {
			// 7 rounded down to 5
			testMinutes(MINUTE_7, 5)
		})
		test('handles custom coarse minutes', () => {
			testMinutes(MINUTE_23, 30, {
				// set diff time from 30 so update goes through
				// since 23 min is rounded to 30 min
				time: '12:35',
				coarseMinutes: 15,
			})
		})
		test('handles coarse click on "59"', () => {
			testMinutes(MINUTE_59, 0)
		})
	})

	test('it changes from hours -> minutes on minute select', () => {
		const { wrapper } = renderTK({ switchToMinuteOnHourSelect: true })

		expect(wrapper.find(HourNumbers)).toExist()

		triggerMouseClick(wrapper, {
			clientX: 150,
			clientY: 35,
		})
		expect(wrapper.find(MinuteNumbers)).toExist()
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

	describe('time top bar', () => {
		function renderHourDropdown(index: number, props: any = {}) {
			const { wrapper, onChange } = renderTK(props)

			const topbar = wrapper.find(TopBar)
			const hour = topbar.find('span[data-type="hour"]')

			// open dropdown
			hour.simulate('click')

			const dropdown = wrapper.find(TimeDropdown)
			const numbers = dropdown.find('li')
			numbers.at(index).simulate('click')

			waitForUpdates(wrapper)

			expect(onChange).toBeCalledTimes(1)
			return onChange
		}

		test('handles hour updates during 12h mode', () => {
			const onChange = renderHourDropdown(6)

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 7,
				}),
			)
		})
		test('handles click on "6" during 24h mode', () => {
			const onChange = renderHourDropdown(6, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 7,
				}),
			)
		})
		test('handles click on "12" during 24h mode', () => {
			const onChange = renderHourDropdown(11, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 12,
				}),
			)
		})
		test('handles click on "24" during 24h mode', () => {
			const onChange = renderHourDropdown(23, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 0,
				}),
			)
		})
		test('handles minute updates correctly', () => {
			const { wrapper, onChange } = renderTK()

			const topbar = wrapper.find(TopBar)
			const minute = topbar.find('span[data-type="minute"]')

			// switch to minutes and open minutes
			minute.simulate('click')
			minute.simulate('click')

			const dropdown = wrapper.find(TimeDropdown)
			const numbers = dropdown.find('li')
			numbers.at(32).simulate('click')

			waitForUpdates(wrapper)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					minute: 32,
				}),
			)
		})
	})
})
