import { CLOCK_RADIUS } from '../../helpers/constants'

/*
	angles are based on top left:
	so 3pm is
		x = clock_radius + clock_radius
		y = clock_radius
*/

export const HOUR_3_OUTER = {
	clientX: CLOCK_RADIUS * 2 - 1,
	clientY: CLOCK_RADIUS,
}
export const HOUR_3_INNER = {
	clientX: CLOCK_RADIUS + 1,
	clientY: CLOCK_RADIUS,
}

export const HOUR_24_OUTER = {
	clientX: CLOCK_RADIUS,
	clientY: 1,
}

export const HOUR_12_INNER = {
	clientX: CLOCK_RADIUS,
	clientY: CLOCK_RADIUS - 1,
}
