
export default function calcOffset(el, clientX, clientY){
	const style = el.currentStyle || window.getComputedStyle(el, null)
	const borderLeftWidth = parseInt(style['borderLeftWidth'], 10)
	const borderTopWidth = parseInt(style['borderTopWidth'], 10)
	const rect = el.getBoundingClientRect()

	return {
		offsetX: clientX - borderLeftWidth - rect.left,
		offsetY: clientY - borderTopWidth - rect.top
	}
}
