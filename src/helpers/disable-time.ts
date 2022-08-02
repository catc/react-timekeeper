import { TIME_PARSE_24 } from './time'

/*
	module assumes 24h format
*/

function parseTime(time: string) {
	const match = time.match(TIME_PARSE_24)
	if (!match) {
		throw new Error('Could not parse time for disabled time range')
	}

	return {
		hour: parseInt(match[1], 10),
		minute: parseInt(match[2], 10),
	}
}

function generateInRangeHourValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
): (hour: number) => boolean {
	const minH = fromH
	const maxH = toH
	const isSameHour = fromH === toH

	if (fromH < toH || (isSameHour && fromM < toM)) {
		// regular range
		return hour =>  hour >= minH && hour <= maxH
	}

	// overnight range: fromH > toH || (isSameHour && fromM > toM)
	return hour => hour >= minH || hour <= maxH
}

function generateInRangeMinuteValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
	hourValidator: (hour: number) => boolean,
): (hour: number, minute: number) => boolean {
	return (h, m) => {
		// if hour is invalid, all minutes should be invalid
		if (!hourValidator(h)) {
			return false
		}
		if (h === fromH) {
			return m >= fromM
		} else if (h === toH) {
			return m <= toM
		}
		return true
	}
}

function generateOutRangeHourValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
): (hour: number) => boolean {
	const minH = fromH
	const maxH = toH
	const isSameHour = fromH === toH

	if (fromH < toH || (isSameHour && fromM < toM)) {
		// regular range
		return hour => hour <= minH || hour >= maxH
	}

	// overnight range: fromH > toH || (isSameHour && fromM > toM)
	return hour => hour <= minH && hour >= maxH
}

function generateOutRangeMinuteValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
	hourValidator: (hour: number) => boolean,
): (hour: number, minute: number) => boolean {
	return (h, m) => {
		// if hour is invalid, all minutes should be invalid
		if (!hourValidator(h)) {
			return false
		}
		if (h === fromH) {
			return m <= fromM
		} else if (h === toH) {
			return m >= toM
		}
		return true
	}
}

export interface TimeRangeValidator {
	validateHour(hour: number): boolean
	validateMinute(hour: number, minute: number): boolean
}

export class TimeInRange implements TimeRangeValidator {
	constructor(from: string, to: string) {
		const { hour: fromH, minute: fromM } = parseTime(from)
		const { hour: toH, minute: toM } = parseTime(to)

		if (fromH === toH && fromM === toM) {
			throw new Error('invalid date range - same time')
		}

		this.validateHour = generateInRangeHourValidator(fromH, fromM, toH, toM)
		this.validateMinute = generateInRangeMinuteValidator(
			fromH,
			fromM,
			toH,
			toM,
			this.validateHour,
		)
	}

	validateHour: (hour: number) => boolean
	validateMinute: (hour: number, minute: number) => boolean
}

export class TimeOutRange implements TimeRangeValidator {
	constructor(from: string, to: string) {
		const { hour: fromH, minute: fromM } = parseTime(from)
		const { hour: toH, minute: toM } = parseTime(to)

		if (fromH === toH && fromM === toM) {
			throw new Error('invalid date range - same time')
		}

		this.validateHour = generateOutRangeHourValidator(fromH, fromM, toH, toM)
		this.validateMinute = generateOutRangeMinuteValidator(
			fromH,
			fromM,
			toH,
			toM,
			this.validateHour,
		)
	}

	validateHour: (hour: number) => boolean
	validateMinute: (hour: number, minute: number) => boolean
}
