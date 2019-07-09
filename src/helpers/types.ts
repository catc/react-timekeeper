import { MutableRefObject } from 'react'

export type ElementRef = MutableRefObject<HTMLDivElement | null>

export interface Time12 {
	hour: number
	minute: number
	meridiem: string
}

export interface Time24 {
	hour: number
	minute: number
}

export type TimeInput = string | Time12 | Time24

export interface TimeOutput {
	formatted: string
	formattedSimple: string
	formatted24: string
	hour: number
	hour24: number
	minute: number
	meridiem: string
}
