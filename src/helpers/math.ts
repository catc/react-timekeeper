import {
	VISIBLE_NUMBERS_PER_CIRCLE,
	CLOCK_RADIUS,
	NUMBER_RADIUS_REGULAR,
} from './constants'

const { cos, sin } = Math
const pi = Math.PI

const ANGLE_PER_INCREMENT = 360 / VISIBLE_NUMBERS_PER_CIRCLE

export function rad(deg: number): number {
	return deg / (180 / pi)
}
export function deg(rad: number): number {
	return rad * (180 / pi)
}

// translate number position
function translateX(index: number, transform: number): number {
	return (
		sin(rad(index * -ANGLE_PER_INCREMENT - 180)) * (CLOCK_RADIUS - transform) +
		CLOCK_RADIUS -
		NUMBER_RADIUS_REGULAR / 2
	)
}

function translateY(index: number, transform: number): number {
	return (
		cos(rad(index * -ANGLE_PER_INCREMENT - 180)) * (CLOCK_RADIUS - transform) +
		CLOCK_RADIUS -
		NUMBER_RADIUS_REGULAR / 2
	)
}

// calculate number position for animation
export function transform(index: number, t: number): string {
	const x = translateX(index, t)
	const y = translateY(index, t)
	return `translate(${x}px, ${y}px)`
}

export function isWithinRadius(x: number, y: number, radius: number): boolean {
	return Math.sqrt(x * x + y * y) < radius
}

// normalize any angles to 0-360 deg
function normalize(angle: number): number {
	return ((angle % 360) + 360) % 360
}

/*
	calculates the shortest angle between the prev and next angle
	to animate to - positive spins clockwise, negative is ccw

	- prev is the previous angle - can literally be almost any value,
	eg: 480 is valid, -480 is valid
	- next is the angle to rotate to - is always between 0-360
	- must return an angle relative to the previous, so once again
	this value can be any negative or positive value (like prev)

	function normalizes each angle, creates an upper and lower bound
	based on previous angle and figures out which direction is shorter
	for next - then diff and add/subtract to previous angle
*/
export function calcAnimationAngle(prev: number, next: number): number {
	const p = normalize(prev)
	const n = normalize(next)

	let lower = p
	let upper = p
	// TODO - implement without while loops
	while (n < lower) {
		lower -= 360
	}
	while (n >= upper) {
		upper += 360
	}

	if (upper - n < n - lower) {
		return prev - (upper - n)
	} else {
		return prev + (n - lower)
	}
}
