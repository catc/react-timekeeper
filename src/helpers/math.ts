import { VISIBLE_NUMBERS_PER_CIRCLE, CLOCK_RADIUS, NUMBER_RADIUS_REGULAR } from './constants'

const { cos, sin } = Math
const pi = Math.PI

const ANGLE_PER_INCREMENT = 360 / VISIBLE_NUMBERS_PER_CIRCLE

function rad(deg: number): number {
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
