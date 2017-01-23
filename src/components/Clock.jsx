import React, { PropTypes } from 'react'
import { spring, TransitionMotion, presets } from 'react-motion';

// TODO - remove this depdency
import css, {loop} from 'reactcss'

import calcRelativePositioning from '../helpers/relative'
/*const Clock = ({}) => {
	return <div>Clock: 0 5 10 15 20 25...</div>
}*/

// radius of clock, in px
const CLOCK_RADIUS = 120
const CLOCK_SIZE = CLOCK_RADIUS * 2

// clock hand length, in px
const CLOCK_HAND_LENGTH = 90

// number of actual numbers to display
const NUMBER_INCREMENTS = 12
const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

// size of circle surrounding number
const NUMBER_SIZE = 36

// positioning of numbers within circle
const NUMBER_INNER_POSITION = 24

function animationPosition(unit){
	return unit === 'hour' ? NUMBER_INNER_POSITION - 34 : NUMBER_INNER_POSITION + 28;
}

const { cos, sin, atan2 } = Math
const pi = Math.PI

function rad(deg){
	return deg / (180 / pi)
}
function deg(rad){
	return rad * (180 / pi)
}

const CLOCK_DATA = {
	hour: {
		numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		increments: 12
	},
	minute: {
		// TODO - change this to string
		numbers: ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'],
		increments: 60
	}
}

/*
	TODO
	- add touchMove
*/

class Clock extends React.Component {
	constructor(props){
		super(props)

		this.state = {}
	}

	render(){
		const props = this.props
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
					fontSize: '18px',
					pointerEvents: 'none',

					// background: '#E6F7FF',
					// border: '1px solid green',
					// background: '#00acff',
					borderRadius: '99px',
					width: NUMBER_SIZE,
					height: NUMBER_SIZE,

					textAlign: 'center',
					lineHeight: NUMBER_SIZE + 'px',
					
					zIndex: 5,
				},
				clockHand: {
					position: 'relative'
				}
			},
		});

		function renderNumbersAndClockhand(){
			const unit = props.unit
			const animationItems = [unit === 'hour' ? 'hour' : 'minute'];

			const animationOptions = {
				willEnter(transition){
					return {
						opacity: 0,
						handOpacity: 0,
						translate: animationPosition(transition.data),
					}
				},
				willLeave(transition){
					return {
						opacity: spring(0),
						handOpacity: spring(0),
						translate: spring( animationPosition(transition.data) ),
					}
				},
				styles: animationItems.map(unit => {
					return {
						key: unit,
						style: {
							opacity: spring(1),
							handOpacity: spring(1, {stiffness: 120, damping: 40}),
							translate: spring(NUMBER_INNER_POSITION),
						},
						data: unit
					}
				})
			}

			const handRotation = props[unit] * (360 / CLOCK_DATA[unit].increments)

			return <TransitionMotion {...animationOptions}>
				{interpolatedStyles =>
					<div>
						{interpolatedStyles.map(config => {
							const data = CLOCK_DATA[config.data]
							
							return <div style={{position: 'absolute'}} key={config.data} ref={el => this.clock = el}>
								{data.numbers.map((numberString, i) => {
									const num = i + 1;
									return (
										<span
											key={numberString}
											style={{
												...styles.numberPositioning,
												opacity: config.style.opacity,
												left: sin( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - config.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2,
												top: cos( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - config.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2,
											}}
										>
											{numberString}
										</span>
									)
								})}
								<svg width={CLOCK_SIZE} height={CLOCK_SIZE} viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`} xmlns="http://www.w3.org/2000/svg"
									style={{
										...styles.clockHand,
										opacity: config.style.handOpacity,
									}}
								>
									<g transform={`rotate(${handRotation} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`}>
										<line x1={CLOCK_RADIUS} y1={CLOCK_RADIUS} x2={CLOCK_RADIUS} y2={CLOCK_RADIUS - CLOCK_HAND_LENGTH}
											strokeWidth="1"
											stroke="#BCEAFF"
										/>
										<circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={1.5}
											fill='#BCEAFF'
										/>
										<circle cx={CLOCK_RADIUS} cy={24} r={NUMBER_SIZE / 2}
											fill='#E6F7FF'
										/>
									</g>
								</svg>

							</div>
						})}
					</div>
				}
			</TransitionMotion>
		}


		return (
			<div style={styles.clockWrapper}>
				{/* formatted numbers + clock hand */}
				<div style={styles.clock} onMouseDown={this.mousedown.bind(this)}>
					{ renderNumbersAndClockhand.call(this) }
				</div>
			</div>
		)
	}
	
	handlePoint(clientX, clientY, el){
		// const { minX, minY } = this.state
		// TODO - cache?
		// TODO - fix if parent has absolute positioning
		const { minX, minY } = calcRelativePositioning(this.clock)

		const x = clientX + minX - CLOCK_RADIUS
		const y = -clientY - minY + CLOCK_RADIUS

		const a = atan2(y, x)
		let d = 90 - deg(a)
		if ( d < 0 ){
			d = 360 + d
		}

		// TODO - move this const to state
		const unit = this.props.unit

		const selected = Math.round( d / 360 * CLOCK_DATA[unit].increments )

		if (unit === 'hour'){
			this.props.changeHour(selected)
		} else if (unit === 'minute'){
			this.props.changeMinute(selected)
		}
	}

	mousedown(e){
		this.handlePoint(e.clientX, e.clientY, e.target)

		// bind handlers
		this.dragHandler = this.drag.bind(this)
		this.stopDragHandler = this.stopDragHandler.bind(this)

		// add listeners
		document.addEventListener('mousemove', this.dragHandler, false)
		document.addEventListener('mouseup', this.stopDragHandler, false)
		this.clock.addEventListener('mouseleave', this.stopDragHandler, false)

		// TODO - add touch
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
}

Clock.propTypes = {
	hour: PropTypes.number.isRequired,
	minute: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	
	changeUnit: PropTypes.func.isRequired,
	changeHour: PropTypes.func.isRequired,
	changeMinute: PropTypes.func.isRequired
}

export default Clock