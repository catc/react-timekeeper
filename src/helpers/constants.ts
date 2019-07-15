export const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map((a) => a.toString())
export const MINUTES_60 = Array.from(Array(60), (_, i) => (i + 1).toString())
export const HOURS_12 = Array.from(Array(12), (_, i) => (i + 1).toString())
export const HOURS_24 = Array.from(Array(23), (_, i) => (i + 1).toString()).concat('00')

export enum MODE {
	'MINUTES' = 'MINUTES',
	'HOURS_12' = 'HOURS_12',
	'HOURS_24' = 'HOURS_24',
}

/*
	- increments is how many splits on clock, visible or invisible
*/
export const CLOCK_VALUES = {
	[MODE.MINUTES]: {
		increments: 60,
		numbers: MINUTES,
		coarseIncrements: 5,
	},
	[MODE.HOURS_12]: {
		increments: 12,
		numbers: HOURS_12,
		coarseIncrements: 1,
	},
	[MODE.HOURS_24]: {
		increments: 12,
		numbers: HOURS_24.slice(12),
		numbersInner: HOURS_24.slice(0, 12),
		coarseIncrements: 1,
	},
}

// TODO - use these
export const HOUR_24_INNER_FONT_SIZE = 15
export const HOUR_24_OUTER_FONT_SIZE = 13

// radius of clock, in px
export const CLOCK_RADIUS = 110
export const CLOCK_SIZE = CLOCK_RADIUS * 2

// clock hand length, in px
export const CLOCK_HAND_LENGTH = 90

// number of actual numbers to display
const NUMBER_INCREMENTS = 12
export const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

// size of circle surrounding number
export const NUMBER_SIZE = 34

// positioning of numbers within circle
export const NUMBER_INNER_POSITION = 22

// initial position of hours/minutes before animating to final position
export const INITIAL_HOUR_TRANSFORM = NUMBER_INNER_POSITION - 30
export const INITIAL_MINUTE_TRANSFORM = NUMBER_INNER_POSITION + 26

// radius of invisible inner circle for 24 hour numbers
export const INNER_NUMBER_RADIUS = 65
export const INNER_NUMBER_CLOCK_HAND_LENGTH = 55

// 24 hour mode inner number positioning (animations)
export const INNER_NUMBER_POSITIONING = {
	initial: 40,
	enter: 55,
	exit: 75,
}
