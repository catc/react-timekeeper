
export function composeTime(hour, minute, meridiem){
	const paddedMinute = ('0' + minute).slice(-2)

	let hour24 = hour;
	if (meridiem === 'pm' && hour !== 12){
		hour24 = hour + 12;
	} else if (meridiem === 'am' && hour === 12){
		hour24 = 0;
	}

	return {
		formatted: `${hour}:${paddedMinute} ${meridiem}`,
		formattedSimple: `${hour}:${paddedMinute}`,
		formatted24: `${hour24}:${paddedMinute}`,
		hour: hour,
		hour24: hour24,
		minute: minute,
		meridiem: meridiem
	}
}

export function composeTime24(hour24, minute) {
	const paddedMinute = ('0' + minute).slice(-2)

	let hour = hour24
	let meridiem = 'am'
	if (hour24 === 24 || hour24 === 0) {
		hour = 12
	}
	else if (hour24 > 12) {
		hour = hour24 - 12
		meridiem = 'pm'
	}
	else if (hour24 === 12) {
		meridiem = 'pm'
	}

	return {
		formatted: `${hour}:${paddedMinute} ${meridiem}`,
		formattedSimple: `${hour}:${paddedMinute}`,
		formatted24: `${hour24}:${paddedMinute}`,
		hour: hour,
		hour24: hour24 < 24 ? hour24 : 0,
		minute: minute,
		meridiem: meridiem
	}
}
