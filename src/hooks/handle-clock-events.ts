import { useEffect, useRef, useCallback } from 'react'

import { CLOCK_RADIUS } from '../helpers/constants'
import { calcOffset } from '../helpers/dom'
import { deg } from '../helpers/math'
import { ElementRef } from '../helpers/types'

const { atan2 } = Math

// TODO - add `handleChange` fn type
export default function useClockEvents(wrapper: ElementRef, clock: ElementRef, handleChange) {
	const dragCount = useRef(0)
	const cleanup = useCallback(_removeHandlers, [])

	// mouse events
	function handleMouseDown() {
		dragCount.current = 0

		// add listeners
		document.addEventListener('mousemove', handleMouseDrag, false)
		document.addEventListener('mouseup', handleStopDrag, false)
		wrapper.current && wrapper.current.addEventListener('mouseleave', handleStopDrag, false)
	}
	function handleMouseDrag(e: MouseEvent) {
		if (clock.current) {
			const { offsetX, offsetY } = calcOffset(clock.current, e.clientX, e.clientY)
			handlePoint(offsetX, offsetY, false, dragCount.current < 2)
		}
		dragCount.current++

		e.preventDefault()
		return false
	}

	// touch events
	function handleTouchStart() {
		dragCount.current = 0

		window.blockMenuHeaderScroll = false // TODO - still used?

		// // add listeners
		document.addEventListener('touchmove', touchDragHandler, false)
		document.addEventListener('touchend', handleStopDrag, false)
		document.addEventListener('touchcancel', handleStopDrag, false)
	}
	function touchDragHandler(e: TouchEvent) {
		if (clock.current) {
			const touch = e.targetTouches[0]
			const { offsetX, offsetY } = calcOffset(clock.current, touch.clientX, touch.clientY)
			handlePoint(offsetX, offsetY, false, dragCount.current < 2)
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
		window.blockMenuHeaderScroll = false // TODO - still used?
	}

	// handle mouse + touch changes
	function _handleMouseUp(e: MouseEvent) {
		if (!clock.current) {
			return
		}

		// if user just clicks/taps a number (drag count < 2), then just assume it's a rough tap
		// and force a rounded/coarse number (ie: 1, 2, 3, 4 is tapped, assume 0 or 5)
		const forceCoarse = dragCount.current < 2

		const { offsetX, offsetY } = calcOffset(clock.current, e.clientX, e.clientY)
		handlePoint(offsetX, offsetY, true, forceCoarse)
	}
	function _handleTouchEnd(e: TouchEvent) {
		const forceCoarse = dragCount.current < 2

		const touch = e.targetTouches[0] || e.changedTouches[0]
		if (touch && clock.current) {
			const { offsetX, offsetY } = calcOffset(clock.current, touch.clientX, touch.clientY)
			handlePoint(offsetX, offsetY, true, forceCoarse)
		}
	}
	function handlePoint(
		clientX: number,
		clientY: number,
		// TODO - see if can remove arg or move elsewhere
		canChangeUnit: boolean,
		// TODO - can probably get rid of forceCoarse and just do the `dragCount.current < 2` check here (make sure it works correctly though)
		forceCoarse: boolean,
	) {
		// console.log('would handle point', clientX, clientY, forceCoarse)

		const x = clientX - CLOCK_RADIUS
		const y = -clientY + CLOCK_RADIUS

		const a = atan2(y, x)
		let d = 90 - deg(a)
		if (d < 0) {
			d = 360 + d
		}

		// ensure touch doesn't bleed outside of clock radius
		const r = Math.sqrt(x * x + y * y)
		if (r > CLOCK_RADIUS && dragCount.current < 2) {
			return false
		}

		// TODO - figure out `canChangeUnit` argument
		handleChange(d, forceCoarse)

		// TODO
		/* const unit = this.props.unit
		const isCoarse = this.props.config.useCoarseMinutes || forceCoarse;

		// calculate value based on current clock increments
		let selected = Math.round(d / 360 * CLOCK_DATA[unit].increments)
		if (isCoarse) {
			// if coarse, round up/down
			const multiplier = CLOCK_DATA[unit].coarseMultiplier;
			selected = Math.round(selected / multiplier) * multiplier;
		}

		if (unit === 'hour') {
			this.props.changeHour(selected, canChangeUnit)
		} else if (unit === 'minute') {
			this.props.changeMinute(selected, canChangeUnit)
		} */
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