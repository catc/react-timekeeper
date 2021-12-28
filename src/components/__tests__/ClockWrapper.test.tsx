import { RenderResult } from '@testing-library/react'
import { renderTK, mockAnimations, clickOnPoint } from './helpers/dom'
import {
	HOUR_12_INNER,
	HOUR_24_OUTER,
	HOUR_3_OUTER,
	HOUR_3_INNER,
	Coords,
} from './helpers/coords'
import { getClockHandLength, MODE } from '../../helpers/constants'
import { Globals } from 'react-spring'

jest.mock('lodash.debounce', () => ({
	__esModule: true,
	default: (fn: any) => fn,
}))

Globals.assign({
	skipAnimation: true,
})

const flushPromises = () => new Promise(setImmediate)

async function testHandLength(coords: Coords, expectedHandLength: number) {
	const { wrapper } = renderTK({
		time: { hour: 5, minute: 20 },
		hour24Mode: true,
	})
	clickOnPoint(wrapper, coords)

	// double flush for HOUR_3_OUTER to resolve (need to investigate why)
	await flushPromises()
	await flushPromises()

	// hand length should be correct
	const handLength = getRenderedClockHandLength(wrapper)
	expect(handLength).toEqual(expectedHandLength)
}

function getRenderedClockHandLength(wrapper: RenderResult) {
	const { getByTestId } = wrapper
	const ch = getByTestId('clock-hand')
	return parseInt(ch.getAttribute('y2') as string, 10)
}

describe('ClockWrapper', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('handles correct clock hand length during 24h mode', () => {
		it('handles inner 3', async () => {
			const expectedLength = getClockHandLength(MODE.HOURS_24, true)
			await testHandLength(HOUR_3_INNER, expectedLength)
		})

		it('handles outer 3', async () => {
			const expectedLength = getClockHandLength(MODE.HOURS_24, false)
			await testHandLength(HOUR_3_OUTER, expectedLength)
		})

		it('handles inner 24', async () => {
			const expectedLength = getClockHandLength(MODE.HOURS_24, true)
			await testHandLength(HOUR_12_INNER, expectedLength)
		})

		it('handles outer 24', async () => {
			const expectedLength = getClockHandLength(MODE.HOURS_24, false)
			await testHandLength(HOUR_24_OUTER, expectedLength)
		})
	})
})
