export function getScrollBarWidth() {
	const scrollDiv = document.createElement('div')
	scrollDiv.className = 'react-timekeeper-scrollbar-measure'
	document.body.appendChild(scrollDiv)
	const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
	document.body.removeChild(scrollDiv)
	return width
}

// TODO - cache `getComputed` style once per mousedown init
// TODO - fix lint errors
export function calcOffset(el: HTMLDivElement, clientX: number, clientY: number) {
	const style = window.getComputedStyle(el, null)
	const borderLeftWidth = parseInt(style['borderLeftWidth'], 10) || 0
	const borderTopWidth = parseInt(style['borderTopWidth'], 10) || 0
	const rect = el.getBoundingClientRect()

	return {
		offsetX: clientX - borderLeftWidth - rect.left,
		offsetY: clientY - borderTopWidth - rect.top,
	}
}
