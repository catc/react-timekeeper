const TIME_PARSE_MERIDIEM = new RegExp(/^(\d{1,2}?):(\d{2}?) (am|pm)$/i)
const TIME_PARSE_24 = new RegExp(/^(\d{1,2}?):(\d{2}?)$/)

export default function parseTime(time){
	let hour;
	let minute;
	let meridiem = 'am'

	try {
		if (typeof time === 'object'){
			hour = time.hour
			minute = time.minute
			meridiem = time.meridiem || meridiem
		} else {
			let match = time.match(TIME_PARSE_MERIDIEM)
			if (match){
				hour = parseInt(match[1], 10)
				minute = parseInt(match[2], 10)
				meridiem = match[3].toLowerCase()
			} else {
				match = time.match(TIME_PARSE_24)
				hour = parseInt(match[1], 10)
				minute = parseInt(match[2], 10)
			}
		}
		
		if (hour > 12){
			hour = hour % 12
			meridiem = 'pm'
		}
	} catch (e){
		// console.debug('Failed to parse time', e)
		hour = 12
		minute = 0
		meridiem = 'pm'
	}
	return {
		hour,
		minute,
		meridiem
	}
}