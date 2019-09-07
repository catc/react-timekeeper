// import React from 'react'
import ClockHand from '../ClockHand'

import './helpers/setup'
import { renderTK, triggerMouseClick, mockAnimations } from './helpers/utils'
import { getClockHandLength, MODE } from '../../helpers/constants'
import { HOUR_12_INNER, HOUR_24_OUTER, HOUR_3_OUTER, HOUR_3_INNER } from './helpers/click-data'

describe('dom updates correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('clock hand length updates correctly during 24h mode', () => {
		function testClockHandLength(coords: any, expectedLength: number) {
			const { wrapper } = renderTK({ hour24Mode: true })

			triggerMouseClick(wrapper, coords)

			const html: string = wrapper
				.find(ClockHand)
				.find('line')
				.html()

			const y2 = html.toString().match(/y2\="(.*?)"/)[1]

			/*
				TODO
				- should be able to do `line.prop('y2')` but props aren't updating
				while dom is... wait for react-spring to update to 9 and see if
				it fixes it
				- in the meantime, render dom, get string and parse out y2 value
			*/
			expect(parseInt(y2, 10)).toEqual(expectedLength)
		}

		test('handles inner 3', () => {
			const len = getClockHandLength(MODE.HOURS_24, true)
			testClockHandLength(HOUR_3_INNER, len)
		})

		test('handles outer 3', () => {
			const len = getClockHandLength(MODE.HOURS_24, false)
			testClockHandLength(HOUR_3_OUTER, len)
		})

		test('handles inner 24', () => {
			const len = getClockHandLength(MODE.HOURS_24, true)
			testClockHandLength(HOUR_12_INNER, len)
		})

		test('handles outer 24', () => {
			const len = getClockHandLength(MODE.HOURS_24, false)
			testClockHandLength(HOUR_24_OUTER, len)
		})
	})
})
