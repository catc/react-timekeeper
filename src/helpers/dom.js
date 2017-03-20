
export function getScrollBarWidth(){
	const scrollDiv = document.createElement('div');
	scrollDiv.className = 'react-timekeeper-scrollbar-measure';
	document.body.appendChild(scrollDiv);
	const width = scrollDiv.offsetWidth-scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	return width;
}

export function calcOffset(el, clientX, clientY){
	const style = el.currentStyle || window.getComputedStyle(el, null)
	const borderLeftWidth = parseInt(style['borderLeftWidth'], 10) || 0
	const borderTopWidth = parseInt(style['borderTopWidth'], 10) || 0
	const rect = el.getBoundingClientRect()

	return {
		offsetX: clientX - borderLeftWidth - rect.left,
		offsetY: clientY - borderTopWidth - rect.top
	}
}
