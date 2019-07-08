import { useEffect, useRef, useCallback } from 'react'

import { calcOffset } from '../helpers/dom'
import { ElementRef } from '../helpers/types'

export default function useClockEvents(wrapper: ElementRef, clock: ElementRef) {
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

		switch (e.type) {
			case 'mouseup':
				_handleMouseUp(e)
				break
			case 'touchcancel':
			case 'touchend':
				_handleTouchEnd(e)
				break
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
		canChangeUnit: boolean,
		forceCoarse: boolean,
	) {
		// TODO
		console.log('would handle point', clientX, clientY, forceCoarse)
	}

	useEffect(() => {
		return cleanup
	}, [cleanup])

	return {
		mousedown: handleMouseDown,
		touchstart: handleTouchStart,
	}
}
