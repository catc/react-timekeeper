import { MODE } from './constants'
import { Time } from './types'

function modeToUnit(mode: MODE): 'hour' | 'minute' {
	return mode === MODE.MINUTES ? 'minute' : 'hour'
}

export function getTimeValue(mode: MODE, time: Time): number {
	const unit = modeToUnit(mode)
	return time[unit]
}

export function isHourMode(mode: MODE): boolean {
	return mode === MODE.HOURS_12 || mode === MODE.HOURS_24
}

export function isMinuteMode(mode: MODE): boolean {
	return mode === MODE.MINUTES
}

export function hasCoarseValue(mode: MODE, config): boolean {}
