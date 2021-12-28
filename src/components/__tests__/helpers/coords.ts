import { rad } from '../../../helpers/math'
import { CLOCK_RADIUS, INNER_NUMBER_RADIUS } from '../../../helpers/constants'

export interface Coords {
	clientX?: number
	clientY?: number
}

// val is 1-60
export function generateCoords(val: number, unit: 'hour' | 'minute'): Coords {
	const angle = unit === 'minute' ? val * 6 : (val % 12) * 30

	const isInner = unit === 'hour' && val <= 12 && val !== 0

	// -1 to ensure it's within radius
	const radius = isInner ? INNER_NUMBER_RADIUS - 1 : CLOCK_RADIUS - 1

	const x = radius * Math.sin(rad(angle))
	const y = radius * Math.cos(rad(angle))
	return {
		clientX: x + CLOCK_RADIUS,
		clientY: Math.abs(y - CLOCK_RADIUS),
	}
}

/*
	angles are based on top left:
	so 3pm is
		x = clock_radius + clock_radius
		y = clock_radius
*/

// TODO - deprecate coords below for fn above
export const HOUR_3_OUTER: Coords = {
	clientX: CLOCK_RADIUS * 2 - 1,
	clientY: CLOCK_RADIUS,
}
export const HOUR_3_INNER: Coords = {
	clientX: CLOCK_RADIUS + 1,
	clientY: CLOCK_RADIUS,
}

export const HOUR_24_OUTER: Coords = {
	clientX: CLOCK_RADIUS,
	clientY: 1,
}

export const HOUR_12_INNER: Coords = {
	clientX: CLOCK_RADIUS,
	clientY: CLOCK_RADIUS - 1,
}

export const MINUTE_7: Coords = {
	clientX: CLOCK_RADIUS + 45,
	clientY: CLOCK_RADIUS / 2,
}

export const MINUTE_23: Coords = {
	clientX: CLOCK_RADIUS + 60,
	clientY: CLOCK_RADIUS + 60,
}

export const MINUTE_59: Coords = {
	clientX: CLOCK_RADIUS - 2,
	clientY: 1,
}

// for testing midnight/noon angles
export const MIDNIGHT_OUTER_FROM_LEFT: Coords = {
	clientX: CLOCK_RADIUS - 1,
	clientY: 1,
}
export const MIDNIGHT_OUTER_FROM_RIGHT: Coords = {
	clientX: CLOCK_RADIUS + 1,
	clientY: 1,
}
export const MIDNIGHT_INNER_FROM_LEFT: Coords = {
	clientX: CLOCK_RADIUS - 1,
	clientY: CLOCK_RADIUS - 25,
}
export const MIDNIGHT_INNER_FROM_RIGHT: Coords = {
	clientX: CLOCK_RADIUS + 1,
	clientY: CLOCK_RADIUS - 25,
}
