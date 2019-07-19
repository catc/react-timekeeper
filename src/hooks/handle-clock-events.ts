import { useEffect, useRef, useCallback } from 'react'

import { CLOCK_RADIUS, INNER_NUMBER_RADIUS } from '../helpers/constants'
import { calcOffset, CalcOffsetFn } from '../helpers/dom'
import { deg, isWithinRadius } from '../helpers/math'
import { ElementRef, CalcTimeFromAngle } from '../helpers/types'

const { atan2 } = Math

/*
	solely responsible for transforming click events into
	angles (which are later converted into time depending
	on current mode and other restrictions)
*/
export default function useClockEvents(
	wrapper: ElementRef,
	clock: ElementRef,
	handleChange: CalcTimeFromAngle,
) {
	const calcOffsetCache: React.MutableRefObject<null | CalcOffsetFn> = useRef(null)
	const dragCount = useRef(0)
	const cleanup = useCallback(_removeHandlers, [])

	// mouse events
	function handleMouseDown() {
		dragCount.current = 0

		// add listeners
		document.addEventListener('mousemove', handleMouseDrag, false)
		document.addEventListener('mouseup', handleStopDrag, false)
		wrapper.current && wrapper.current.addEventListener('mouseleave', handleStopDrag, false)

		if (clock.current) {
			calcOffsetCache.current = calcOffset(clock.current)
			clock.current.style.cursor = '-webkit-grabbing'
			clock.current.style.cursor = 'grabbing'
		}
	}
	function handleMouseDrag(e: MouseEvent) {
		if (calcOffsetCache.current) {
			const { offsetX, offsetY } = calcOffsetCache.current(e.clientX, e.clientY)
			calculatePoint(offsetX, offsetY, false)
		}
		dragCount.current++

		e.preventDefault()
		return false
	}

	// touch events
	function handleTouchStart() {
		dragCount.current = 0

		// add listeners
		document.addEventListener('touchmove', touchDragHandler, false)
		document.addEventListener('touchend', handleStopDrag, false)
		document.addEventListener('touchcancel', handleStopDrag, false)

		if (clock.current) {
			calcOffsetCache.current = calcOffset(clock.current)
		}
	}
	function touchDragHandler(e: TouchEvent) {
		if (calcOffsetCache.current) {
			const touch = e.targetTouches[0]
			const { offsetX, offsetY } = calcOffsetCache.current(touch.clientX, touch.clientY)
			calculatePoint(offsetX, offsetY, false)
		}
		dragCount.current++

		e.preventDefault()
		return false
	}

	// stop mouse + touch events
	function handleStopDrag(e: MouseEvent | TouchEvent) {
		_removeHandlers()

		if (e == null || clock.current == null) {
			return
		}

		if (isMouseEventEnd(e)) {
			_handleMouseUp(e)
		} else if (isTouchEventEnd(e)) {
			_handleTouchEnd(e)
		}

		function isMouseEventEnd(e: MouseEvent | TouchEvent): e is MouseEvent {
			return e.type === 'mouseup'
		}
		function isTouchEventEnd(e: MouseEvent | TouchEvent): e is TouchEvent {
			return e.type === 'touchcancel' || e.type === 'touchend'
		}
	}
	function _removeHandlers() {
		document.removeEventListener('mousemove', handleMouseDrag, false)
		document.removeEventListener('mouseup', handleStopDrag, false)
		wrapper.current && wrapper.current.removeEventListener('mouseleave', handleStopDrag, false)

		document.removeEventListener('touchmove', touchDragHandler, false)
		document.removeEventListener('touchend', handleStopDrag, false)
		document.removeEventListener('touchcancel', handleStopDrag, false)
	}

	// handle mouse + touch changes
	function _handleMouseUp(e: MouseEvent) {
		if (!clock.current) {
			return
		}
		clock.current.style.cursor = ''

		const { offsetX, offsetY } = calcOffsetCache.current!(e.clientX, e.clientY)
		calculatePoint(offsetX, offsetY, true)
	}
	function _handleTouchEnd(e: TouchEvent) {
		const touch = e.targetTouches[0] || e.changedTouches[0]
		if (touch && calcOffsetCache.current) {
			const { offsetX, offsetY } = calcOffsetCache.current(touch.clientX, touch.clientY)
			calculatePoint(offsetX, offsetY, true)
		}
	}
	function calculatePoint(
		offsetX: number,
		offsetY: number,
		// determines if change is due to mouseup/touchend in order to
		// automatically change unit (eg: hour -> minute) if enabled
		// prevents changing unit if dragging along clock
		canAutoChangeUnit: boolean,
	) {
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
		if (!isWithinRadius(x, y, CLOCK_RADIUS) && dragCount.current < 2) {
			return false
		}
		const isInnerClick = isWithinRadius(x, y, INNER_NUMBER_RADIUS)

		// update time on main
		handleChange(d, { canAutoChangeUnit, wasTapped, isInnerClick })
	}

	// will destroy cleanup
	useEffect(() => {
		return cleanup
	}, [cleanup])

	return {
		mousedown: handleMouseDown,
		touchstart: handleTouchStart,
	}
}
