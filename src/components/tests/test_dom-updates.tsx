// import React from 'react'
import ClockHand from '../ClockHand'

import './setup'
import { renderTK, triggerMouseClick, mockAnimations } from './utils'
import { getClockHandLength, MODE } from '../../helpers/constants'
import { HOUR_12_INNER, HOUR_24_OUTER, HOUR_3_OUTER, HOUR_3_INNER } from './click-data'

describe('dom updates correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('clock hand length updates correctly during 24h mode', () => {
		function testClockHandLength(coords: any, expectedLength: number) {
			const { wrapper } = renderTK({ hour24Mode: true })

			triggerMouseClick(wrapper, coords)

			const line = wrapper.find(ClockHand).find('line')
			expect(line.prop('y2')).toEqual(expectedLength)
		}

		test('handles inner 24', () => {
			const len = getClockHandLength(MODE.HOURS_24, true)
			testClockHandLength(HOUR_3_INNER, len)
		})

		test('handles outer 24', () => {
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
