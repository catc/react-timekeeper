export function getScrollBarWidth() {
	const scrollDiv = document.createElement('div')
	scrollDiv.className = 'react-timekeeper-scrollbar-measure'
	document.body.appendChild(scrollDiv)
	const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
	document.body.removeChild(scrollDiv)
	return width
}

export type CalcOffsetFn = (x: number, y: number) => { offsetX: number; offsetY: number }

export function calcOffset(el: HTMLDivElement): CalcOffsetFn {
	const style = window.getComputedStyle(el, null)

	return function memoizedCalcOffset(
		clientX: number,
		clientY: number,
	): { offsetX: number; offsetY: number } {
		const borderLeftWidth = parseInt(style.borderLeftWidth!, 10) || 0
		const borderTopWidth = parseInt(style.borderTopWidth!, 10) || 0
		const rect = el.getBoundingClientRect()

		return {
			offsetX: clientX - borderLeftWidth - rect.left,
			offsetY: clientY - borderTopWidth - rect.top,
		}
	}
}
