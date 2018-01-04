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
		// if is string
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
			minute = parseInt(match[2], 10);
			const h = parseInt(match[1], 10);
			({hour, meridiem} = handle24(h));
		}
		if (hour === 0){
			// if 0:32, should be 12:32 am
			hour = 12
		}
	} else if (typeof time === 'object'){
		// if is object
		if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)){
			throw new Error('Time and minute must both be valid integers')
		}
		minute = time.minute
		if (time.meridiem){
			hour = handle12(time.hour);
			meridiem = time.meridiem
		} else {
			({hour, meridiem} = handle24(time.hour));
		}
	}

	if (hour > 12 || minute > 60){
		throw new Error('Time out of range');
	}

	return {
		hour,
		minute,
		meridiem
	}
}

function handle12(hour){
	if (hour > 12){
		throw new Error(`Hour out of range (${hour} > 12)`);
	}
	if (hour === 0){
		hour = 12
	}
	return hour
}

function handle24(hour){
	let meridiem = 'am';
	if (hour > 24){
		throw new Error('Hour out of range (> 24)');
	}
	if (hour === 24){
		hour = 12;
	} else if (hour > 11){
		meridiem = 'pm'
		if (hour > 12){
			hour = hour % 12
		}
	}
	return { hour, meridiem };
}
