import { Time } from './types'

export const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map((a) => a.toString())
export const MINUTES_60 = Array.from(Array(60), (_, i) => (i + 1).toString())
export const HOURS_12 = Array.from(Array(12), (_, i) => (i + 1).toString())
export const HOURS_24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => a.toString())

// export type MODE = 'MINUTES' | 'HOURS_12' | 'HOURS_24'
export enum MODE {
	'MINUTES' = 'MINUTES',
	'HOURS_12' = 'HOURS_12',
	'HOURS_24' = 'HOURS_24',
}

function modeToUnit(mode: MODE): 'hour' | 'minute' {
	return mode === MODE.MINUTES ? 'minute' : 'hour'
}

// TODO - move this to time helpers?
export function getTimeValue(mode: MODE, time: Time): number {
	const unit = modeToUnit(mode)
	return time[unit]
}

export function hasCoarseValue(mode: MODE, config): boolean {}

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
		increments: 24,
		numbers: HOURS_24,
		coarseIncrements: 1,
	},
}

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
