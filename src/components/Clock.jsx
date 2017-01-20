import React, { PropTypes } from 'react'

import css, {loop} from 'reactcss'

/*const Clock = ({}) => {
	return <div>Clock: 0 5 10 15 20 25...</div>
}*/
const CLOCK_RADIUS = 120
const CLOCK_SIZE = CLOCK_RADIUS * 2

const CLOCK_HAND_LENGTH = 90


// number of actual numbers
const NUMBER_INCREMENTS = 12
const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

const NUM_SIZE = 32

const { cos, sin, tan, atan2 } = Math
const pi = Math.PI

window.cos = cos
window.sin = sin
window.pi = pi
window.tan = tan
window.atan2 = atan2

function rad(deg){
	return deg / (180 / pi)
}
function deg(rad){
	return rad * (180 / pi)
}
window.rad = rad
window.deg = deg

/*
	TODO
	- add circle showing what is currently selected
	- add dragMove/touchMove
	- add animations switching between numbers
*/

class Clock extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// selected: 2,

			// only for testing (dot)
			pointx: 0,
			pointy: 0
		}
	}
	componentDidMount(){
		function isRelative(el){
			return window.getComputedStyle(el).position === 'relative';
		}
		const el = this.clock
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

		this.setState({
			minX,
			minY
		})
	}
	render(){
		const styles = css({
			default: {
				clockWrapper: {
					// background: 'purple'
					textAlign: 'center',
					padding: '20px 0'
				},
				clock: {
					display: 'inline-block',
					borderRadius: '200px',
					background: 'white',
					width: `${CLOCK_SIZE}px`,
					height: `${CLOCK_SIZE}px`,
					position: 'relative',
					cursor: 'pointer',
				},
				numberPositioning: {
					display: 'inline-block',
					position: 'absolute',
					color: '#898989',
					fontSize: '15px',
					pointerEvents: 'none',

					// background: '#E6F7FF',
					// border: '1px solid green',
					// background: '#00acff',
					borderRadius: '99px',
					width: NUM_SIZE,
					height: NUM_SIZE,

					textAlign: 'center',
					lineHeight: NUM_SIZE + 'px',
					
					zIndex: 5,
				},
				clockHand: {
					// zIndex: 5,
					position: 'relative'
					/*position: 'absolute',
					display: 'inline-block',
					top: CLOCK_RADIUS,
					left: CLOCK_RADIUS,
					width: 1,
					height: 1,
					background: 'red'*/
				}
			},
		});

		// number of possible increments (60 for minutes, 12 for hours)
		const INCREMENT = this.props.increments
		const INCREMENT_VALUE = 360 / INCREMENT

		
		// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		const numbers = this.props.numbers
		const formattedNumbers = numbers.map((n, i, items) => {
			// console.log( loop(i, items.length) )
			// console.log( 'left is', sin( rad(n * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - 20) + CLOCK_RADIUS - NUM_SIZE / 2 )
			const num = i + 1;
			return (
				<span
					key={n}
					style={{
						...styles.numberPositioning,
						// top: 75,
						// left: 225,
						// left: sin( rad(n * -30 - 180) ) * CLOCK_RADIUS + CLOCK_RADIUS,
						// top: cos( rad(n * -30 - 180) ) * CLOCK_RADIUS + CLOCK_RADIUS,
						left: sin( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - 20) + CLOCK_RADIUS - NUM_SIZE / 2,
						top: cos( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - 20) + CLOCK_RADIUS - NUM_SIZE / 2,
						// left: sin( rad(n * -30 - 180) ) * CLOCK_RADIUS + CLOCK_RADIUS  + ( sin(rad(n * 30)) > 0 ? -NUM_SIZE / 2 : 0 ),
						// top: cos( rad(n * -30 - 180) ) * CLOCK_RADIUS + CLOCK_RADIUS,
					}}
					// even={true}
					// {...loop(i, items.length)}
				>
					{n}
				</span>
			)
		})
		
		const selected = this.props.val
		const handRotation = selected * INCREMENT_VALUE
		// const handRotation = 0


		return (
			<div style={styles.clockWrapper}>
				{/*<div style={styles.clock} onClick={this.handleClick.bind(this)}>*/}
				<div style={styles.clock} onMouseDown={this.mousedown.bind(this)}>
					{formattedNumbers}

					{/* x + y lines */}
					<span style={{
						display: 'inline-block',
						// background: 'rgba(0,0,0,0.2)',
						position: 'absolute',
						width: '100%',
						height: 1,
						left: 0,
						top: '50%'
					}}></span>
					<span style={{
						display: 'inline-block',
						// background: 'rgba(0,0,0,0.2)',
						position: 'absolute',
						height: '100%',
						width: 1,
						top: 0,
						left: '50%'
					}}></span>

					{/* TESTING DOT */}
					<span style={{
						borderRadius: 10,
						background: 'red',
						display: 'inline-block',
						width: 4,
						height: 4,
						position: 'absolute',
						left: this.state.pointx - 2,
						top: this.state.pointy - 2
					}}></span>

					<svg width={CLOCK_SIZE} height={CLOCK_SIZE} viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`} xmlns="http://www.w3.org/2000/svg"
						ref={el => this.clock = el}
						style={{
							...styles.clockHand,
							// border: '1px solid red'
						}}
					>
						<g transform={`rotate(${handRotation} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`}>
							<line x1={CLOCK_RADIUS} y1={CLOCK_RADIUS} x2={CLOCK_RADIUS} y2={CLOCK_RADIUS - CLOCK_HAND_LENGTH}
								// transformOrigin="0px 0px"
								strokeWidth="1"
								stroke="#BCEAFF"
								
							/>
							<circle cx={CLOCK_RADIUS} cy={19} r={NUM_SIZE / 2}
								fill='#E6F7FF'
								// fill="transparent"
								// strokeWidth="1" stroke="red"
							/>
						</g>
					</svg>
				</div>

				{/* stats */}
				<br/>
				normalized: {(() => {
					// <br/><br/>
					// {this.state.pointx} - {this.state.pointy} 
					const x = this.state.pointx - 120
					const y = - this.state.pointy + 120
					return `${x}, ${y}`
				})()}
				<br/>
				{(() => {
					const x = this.state.pointx - 120
					const y = - this.state.pointy + 120

					const a = atan2(y, x)
					return 'rads: ' + a
				})()}
				<br/>
				{(() => {
					const x = this.state.pointx - 120
					const y = - this.state.pointy + 120

					const a = atan2(y, x)
					let d = 90 - deg(a)
					if ( d < 0 ){
						d = 360 + d
					}
					return `deg: ${d}`
				})()}

				<br/>
				<input type="text" value={selected} onChange={((e) => {this.setState({selected: parseInt(e.target.value) || 0})})}/>
			</div>
		)
	}
	
	handlePoint(clientX, clientY){
		const { minX, minY } = this.state

		const x = clientX + minX
		const y = clientY + minY

		// FOR TESTING with dot
		this.setState({
			pointx: x,
			pointy: y
		})

		this.updateSelected(x, y)
	}

	mousedown(e){
		this.handlePoint(e.clientX, e.clientY)

		// bind handlers
		this.dragHandler = this.drag.bind(this)
		this.stopDragHandler = this.stopDragHandler.bind(this)

		// add listeners
		document.addEventListener('mousemove', this.dragHandler, false)
		document.addEventListener('mouseup', this.stopDragHandler, false)
		this.clock.addEventListener('mouseleave', this.stopDragHandler, false)
	}
	drag(e){
		this.handlePoint(e.clientX, e.clientY)
		e.preventDefault()
		return false
	}

	stopDragHandler(){
		document.removeEventListener('mousemove', this.dragHandler, false)
		document.removeEventListener('mouseup', this.stopDragHandler, false)
		this.clock.removeEventListener('mouseleave', this.stopDragHandler, false)
	}

	componentWillUnmount(){
		// clear any event listeners
		this.stopDragHandler()
	}


	updateSelected(pointx, pointy){
		const x = pointx - 120
		const y = -pointy + 120

		const a = atan2(y, x)
		let d = 90 - deg(a)
		if ( d < 0 ){
			d = 360 + d
		}

		// TODO - move this const to state
		const INCREMENT = this.props.increments
		const INCREMENT_VALUE = 360 / INCREMENT

		const selected = Math.round( d / INCREMENT_VALUE )

		// this.setState({
		// 	selected
		// })
		this.props.update(selected)
	}
}

export default Clock