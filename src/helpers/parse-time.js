const TIME_PARSE_MERIDIEM = new RegExp(/^(\d{1,2}?):(\d{2}?)\s?(am|pm)$/i)
const TIME_PARSE_24 = new RegExp(/^(\d{1,2}?):(\d{2}?)$/)

const defaultTime = {
	hour: 12,
	minute: 0,
	meridiem: 'pm'
}

// parse and normalize time to 12h format with meridiem
export default function parseTime(time){
	time = time || defaultTime;
	
	let hour;
	let minute;
	let meridiem = 'am'

	if (typeof time === 'string'){
		let match = time.match(TIME_PARSE_MERIDIEM)
		if (match){
			hour = parseInt(match[1], 10)
			minute = parseInt(match[2], 10)
			meridiem = match[3].toLowerCase()

		} else {
			match = time.match(TIME_PARSE_24)
			if (!match){
				throw new Error('Could not parse time (string)');
			}
			hour = parseInt(match[1], 10);
			minute = parseInt(match[2], 10);

			({hour, meridiem} = handle24(hour, meridiem))
		}
	} else if (typeof time === 'object'){
		if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)){
			throw new Error('Time and minute must both be valid integers')
		}
		hour = time.hour
		minute = time.minute
		meridiem = time.meridiem || meridiem;

		({hour, meridiem} = handle24(hour, meridiem));
	}

	if (hour > 12 || minute > 60){
		throw new Error('Time out of range');
	}
	if (hour === 0){
		hour = 12
	}

	return {
		hour,
		minute,
		meridiem
	}
}

function handle24(hour, meridiem){
	if (hour > 24){
		throw new Error('Hour out of range (> 24)');
	}

	if (hour > 12){
		hour = hour % 12
		meridiem = 'pm'
	}
	return { hour, meridiem };
}
