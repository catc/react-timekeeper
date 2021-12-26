import { CLOCK_RADIUS } from '../../../helpers/constants'

export interface Coords {
	clientX?: number
	clientY?: number
}

/*
	angles are based on top left:
	so 3pm is
		x = clock_radius + clock_radius
		y = clock_radius
*/

/*
	TODO - make function to convert minutes/hours to coords
	otherwise changing CLOCK_RADIUS will end up breaking coords
*/

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
