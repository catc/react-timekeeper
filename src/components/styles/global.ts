// TODO - see what's actually used

const style = `
	.react-timekeeper-button-reset {
		background: 0;
		border: 0;
		box-shadow: none;
		text-shadow: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		cursor: pointer;
	}
	.react-timekeeper-button-reset:hover, .react-timekeeper-button-reset:focus, .react-timekeeper-button-reset:active {
		outline: none;
	}
	.react-timekeeper-button-reset::-moz-focus-inner {
		border: 0;
		padding: 0;
	}
	.react-timekeeper-noscroll {
		overflow: hidden;
	}
	.react-timekeeper-scrollbar-measure {
		width: 100px;
		height: 100px;
		overflow: scroll;
		position: absolute;
		top: -9999px;
	}
`

export default style
