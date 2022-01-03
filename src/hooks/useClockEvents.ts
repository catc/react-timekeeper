import { useEffect, useRef, useCallback } from 'react'

import { CLOCK_RADIUS, INNER_NUMBER_RADIUS } from '../helpers/constants'
import { calcOffset, CalcOffsetFn } from '../helpers/dom'
import { deg, isWithinRadius } from '../helpers/math'
import { ElementRef } from '../helpers/types'

const { atan2 } = Math

type CalcTimeFromAngle = (
	angle: number,
	{
		canAutoChangeMode,
		wasTapped,
	}: { canAutoChangeMode: boolean; wasTapped: boolean; isInnerClick: boolean },
) => void

/*
	solely responsible for transforming click events into
	angles (which are later converted into time depending
	on current mode and other restrictions)
*/
export default function useClockEvents(
	clock: ElementRef,
	handleChange: CalcTimeFromAngle,
) {
	const wrapper = useRef<HTMLDivElement | null>(null)
	const calcOffsetCache: React.MutableRefObject<null | CalcOffsetFn> = useRef(null)
	const dragCount = useRef(0)
	const cleanupRef = useRef<() => void>(() => {})

	// avoid recomputing all the event listeners, prolly unnecessary...
	const handleChangeRef = useRef(handleChange)
	useEffect(() => {
		handleChangeRef.current = handleChange
	}, [handleChange])

	const calculatePoint = useCallback(
		(
			offsetX: number,
			offsetY: number,
			// determines if change is due to mouseup/touchend in order to
			// automatically change unit (eg: hour -> minute) if enabled
			// prevents changing unit if dragging along clock
			canAutoChangeMode: boolean,
		) => {
			// if user just clicks/taps a number (drag count < 2), then just assume it's a rough tap
			// and force a rounded/coarse number (ie: 1, 2, 3, 4 is tapped, assume 0 or 5)
			const wasTapped = dragCount.current < 2

			const x = offsetX - CLOCK_RADIUS
			const y = -offsetY + CLOCK_RADIUS

			const a = atan2(y, x)
			let d = 90 - deg(a)
			if (d < 0) {
				d = 360 + d
			}

			// ensure touch doesn't bleed outside of clock radius
			if (!isWithinRadius(x, y, CLOCK_RADIUS) && wasTapped) {
				return false
			}
			const isInnerClick = isWithinRadius(x, y, INNER_NUMBER_RADIUS)

			// update time on main
			handleChangeRef.current(d, { canAutoChangeMode, wasTapped, isInnerClick })
		},
		[],
	)

	// handle mouse + touch changes
	const handleMouseUp = useCallback(
		(e: MouseEvent) => {
			if (!clock.current) {
				return
			}
			clock.current.style.cursor = ''

			const { offsetX, offsetY } = calcOffsetCache.current!(e.clientX, e.clientY)
			calculatePoint(offsetX, offsetY, true)
		},
		[calculatePoint, clock],
	)
	const handleTouchEnd = useCallback(
		(e: TouchEvent) => {
			const touch = e.targetTouches[0] || e.changedTouches[0]
			if (touch && calcOffsetCache.current) {
				const { offsetX, offsetY } = calcOffsetCache.current(
					touch.clientX,
					touch.clientY,
				)
				calculatePoint(offsetX, offsetY, true)
			}
		},
		[calculatePoint],
	)

	const handleMouseDrag = useCallback(
		(e: MouseEvent) => {
			if (calcOffsetCache.current) {
				const { offsetX, offsetY } = calcOffsetCache.current(e.clientX, e.clientY)
				calculatePoint(offsetX, offsetY, false)
			}
			dragCount.current++

			if (dragCount.current === 1 && clock.current) {
				clock.current.style.cursor = '-webkit-grabbing'
				clock.current.style.cursor = 'grabbing'
			}

			e.preventDefault()
			return false
		},
		[calculatePoint, clock],
	)
	const handleTouchDrag = useCallback(
		(e: TouchEvent) => {
			if (calcOffsetCache.current) {
				const touch = e.targetTouches[0]
				const { offsetX, offsetY } = calcOffsetCache.current(
					touch.clientX,
					touch.clientY,
				)
				calculatePoint(offsetX, offsetY, false)
			}
			dragCount.current++

			e.preventDefault()
			return false
		},
		[calculatePoint],
	)

	// stop mouse + touch events
	const handleStopDrag = useCallback(
		(e: MouseEvent | TouchEvent) => {
			cleanupRef.current()

			if (e == null || clock.current == null) {
				return
			}

			if (isMouseEventEnd(e)) {
				handleMouseUp(e)
			} else if (isTouchEventEnd(e)) {
				handleTouchEnd(e)
			}

			function isMouseEventEnd(e: MouseEvent | TouchEvent): e is MouseEvent {
				return e.type === 'mouseup'
			}
			function isTouchEventEnd(e: MouseEvent | TouchEvent): e is TouchEvent {
				return e.type === 'touchcancel' || e.type === 'touchend'
			}
		},
		[handleMouseUp, handleTouchEnd, clock],
	)

	// mouse events
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			dragCount.current = 0

			// terminate if click is outside of clock radius, ie:
			// if clicking meridiem button which overlaps with clock
			if (clock.current) {
				calcOffsetCache.current = calcOffset(clock.current)
				const { offsetX, offsetY } = calcOffsetCache.current!(
					e.clientX,
					e.clientY,
				)
				const x = offsetX - CLOCK_RADIUS
				const y = offsetY - CLOCK_RADIUS
				if (!isWithinRadius(x, y, CLOCK_RADIUS)) return
			}

			// add listeners
			document.addEventListener('mousemove', handleMouseDrag, false)
			document.addEventListener('mouseup', handleStopDrag, false)
			wrapper.current &&
				wrapper.current.addEventListener('mouseleave', handleStopDrag, false)

			// @ts-ignore
			handleMouseDrag(e)
		},
		[clock, handleMouseDrag, handleStopDrag],
	)

	// touch events
	const handleTouchStart = useCallback(
		(e: TouchEvent) => {
			e.preventDefault()

			dragCount.current = 0

			// add listeners
			document.addEventListener('touchmove', handleTouchDrag, false)
			document.addEventListener('touchend', handleStopDrag, false)
			document.addEventListener('touchcancel', handleStopDrag, false)

			if (clock.current) {
				calcOffsetCache.current = calcOffset(clock.current)
			}
		},
		[clock, handleStopDrag, handleTouchDrag],
	)

	// attach touchstart event manually to the clock to make it cancelable.
	useEffect(() => {
		const currentTarget = clock.current
		const type = 'touchstart'
		if (currentTarget) {
			currentTarget.addEventListener(type, handleTouchStart, false)
		}
		return () => {
			if (currentTarget) {
				currentTarget.removeEventListener(type, handleTouchStart, false)
			}
		}
	}, [clock, handleTouchStart])

	/*
		deals with circular dependencies of callback functions; add listener function
		depends on remove listener function and vice versa
		on remove listener function which depends on the add listener cb
	*/
	useEffect(() => {
		cleanupRef.current = () => {
			document.removeEventListener('mousemove', handleMouseDrag, false)
			document.removeEventListener('mouseup', handleStopDrag, false)
			wrapper.current &&
				wrapper.current.removeEventListener('mouseleave', handleStopDrag, false)

			document.removeEventListener('touchmove', handleTouchDrag, false)
			document.removeEventListener('touchend', handleStopDrag, false)
			document.removeEventListener('touchcancel', handleStopDrag, false)
		}
	}, [handleMouseDrag, handleStopDrag, handleTouchDrag])

	// clean up
	useEffect(() => {
		return cleanupRef.current
	}, [])

	return {
		bind: {
			onMouseDown: handleMouseDown,
			ref: wrapper,
		},
	}
}
