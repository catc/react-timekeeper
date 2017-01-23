
export default function calcRelativePositioning(el){
	function isRelative(el){
		return window.getComputedStyle(el).position === 'relative';
	}

	const relTo = document.body
	let traverse = el;
	let minX = 0;
	let minY = 0;
	while (traverse !== relTo){
		traverse = traverse.parentNode;
		if (isRelative(traverse)){
			minX -= traverse.offsetLeft;
			minY -= traverse.offsetTop;
		}
		if (traverse === relTo){
			minX += traverse.offsetLeft;
			minY += traverse.offsetTop;
		}
	}
	return { minX, minY }
}
