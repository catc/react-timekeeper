import React, { PropTypes } from 'react'
import { spring, TransitionMotion } from 'react-motion';
import Radium from 'radium'

import { calcOffset } from '../helpers/dom'
import { CLOCK_DATA } from '../helpers/data';


// radius of clock, in px
const CLOCK_RADIUS = 110
const CLOCK_SIZE = CLOCK_RADIUS * 2

// clock hand length, in px
const CLOCK_HAND_LENGTH = 90

// number of actual numbers to display
const NUMBER_INCREMENTS = 12
const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

// size of circle surrounding number
const NUMBER_SIZE = 34

// positioning of numbers within circle
const NUMBER_INNER_POSITION = 22
function animationPosition(unit){
	return unit === 'hour' ? NUMBER_INNER_POSITION - 30 : NUMBER_INNER_POSITION + 26;
}

const { cos, sin, atan2 } = Math
const pi = Math.PI

function rad(deg){
	return deg / (180 / pi)
}
function deg(rad){
	return rad * (180 / pi)
}


export class Clock extends React.Component {
	constructor(props){
		super(props)
		this.mousedown = this.mousedown.bind(this)
		this.touchstart = this.touchstart.bind(this)
	}
	render(){
		const props = this.props;
		const config = props.config;
		const styles = {
			clock: {
				display: 'inline-block',
				borderRadius: '200px',
				background: config.CLOCK_BACKGROUND,
				width: `${CLOCK_SIZE}px`,
				height: `${CLOCK_SIZE}px`,
				position: 'relative',
				cursor: 'pointer',
			},
			numberPositioning: {
				display: 'inline-block',
				position: 'absolute',
				color: config.CLOCK_NUMBER_COLOR,
				fontSize: '16px',
				pointerEvents: 'none',
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
		}

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
					<div className="react-timekeeper__clock-animations-wrapper">
						{interpolatedStyles.map(anim => {
							const data = CLOCK_DATA[anim.data]

							let showIntermediateValueDisplay;
							if (anim.data === 'minute' && props.minute%5){
								showIntermediateValueDisplay = <circle cx={CLOCK_RADIUS} cy={NUMBER_INNER_POSITION} r={4}
									fill={config.CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND}
								/>
							}
							
							return <div style={{position: 'absolute'}} key={anim.data} ref={el => this.clock = el} className="react-timekeeper__clock-animations">
								{data.numbers.map((numberString, i) => {
									const num = i + 1;
									return (
										<span
											key={numberString}
											style={{
												...styles.numberPositioning,
												opacity: anim.style.opacity,
												left: sin( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - anim.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2,
												top: cos( rad(num * -NUMBER_INCREMENTS_VALUE - 180) ) * (CLOCK_RADIUS - anim.style.translate) + CLOCK_RADIUS - NUMBER_SIZE / 2,
											}}
										>
											{numberString}
										</span>
									)
								})}

								{/* place svg over and set z-index on numbers to prevent highlighting numbers on drag */}
								<svg width={CLOCK_SIZE} height={CLOCK_SIZE} viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`} xmlns="http://www.w3.org/2000/svg"
									style={{
										...styles.clockHand,
										opacity: anim.style.handOpacity,
									}}
									className="react-timekeeper__clock-svgs"
								>
									<g transform={`rotate(${handRotation} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`}>
										<line x1={CLOCK_RADIUS} y1={CLOCK_RADIUS} x2={CLOCK_RADIUS} y2={CLOCK_RADIUS - CLOCK_HAND_LENGTH}
											strokeWidth="1"
											stroke={config.CLOCK_HAND_ARM}
										/>
										<circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={1.5}
											fill={config.CLOCK_HAND_ARM}
										/>
										<circle cx={CLOCK_RADIUS} cy={NUMBER_INNER_POSITION} r={NUMBER_SIZE / 2}
											fill={config.CLOCK_HAND_CIRCLE_BACKGROUND}
										/>
										{showIntermediateValueDisplay}
									</g>
								</svg>
							</div>
						})}
					</div>
				}
			</TransitionMotion>
		}


		return (
			<div
				style={styles.clock}
				onMouseDown={this.mousedown}
				onTouchStart={this.touchstart}
				className="react-timekeeper__clock"
			>
				{ renderNumbersAndClockhand.call(this) }
			</div>
		)
	}
	
	handlePoint(clientX, clientY, canChangeUnit){
		const x = clientX - CLOCK_RADIUS
		const y = -clientY + CLOCK_RADIUS

		const a = atan2(y, x)
		let d = 90 - deg(a)
		if ( d < 0 ){
			d = 360 + d
		}

		const unit = this.props.unit
		const selected = Math.round( d / 360 * CLOCK_DATA[unit].increments )

		if (unit === 'hour'){
			this.props.changeHour(selected, canChangeUnit)
		} else if (unit === 'minute'){
			this.props.changeMinute(selected, canChangeUnit)
		}
	}

	mousedown(){
		this.mousedragHandler = this.mousedrag.bind(this)
		this.stopDragHandler = this.stopDragHandler.bind(this)

		// add listeners
		document.addEventListener('mousemove', this.mousedragHandler, false)
		document.addEventListener('mouseup', this.stopDragHandler, false)
		this.props.clockWrapperEl.addEventListener('mouseleave', this.stopDragHandler, false)
	}
	mousedrag(e){
		const { offsetX, offsetY } = calcOffset(this.clock, e.clientX, e.clientY)
		this.handlePoint(offsetX, offsetY)

		e.preventDefault()
		return false
	}
	touchstart(){
		// bind handlers
		this.touchdragHandler = this.touchdrag.bind(this)
		this.stopDragHandler = this.stopDragHandler.bind(this)

		window.blockMenuHeaderScroll = false

		document.addEventListener('touchmove', this.touchdragHandler, false)
		document.addEventListener('touchend', this.stopDragHandler, false)
		document.addEventListener('touchcancel', this.stopDragHandler, false)
	}
	touchdrag(e){
		const touch = e.targetTouches[0];
		const { offsetX, offsetY } = calcOffset(this.clock, touch.clientX, touch.clientY)
		this.handlePoint(offsetX, offsetY)

		e.preventDefault()
		return false
	}
	stopDragHandler(e = {}){
		document.removeEventListener('mousemove', this.mousedragHandler, false)
		document.removeEventListener('mouseup', this.stopDragHandler, false)
		this.props.clockWrapperEl.removeEventListener('mouseleave', this.stopDragHandler, false)

		document.removeEventListener('touchmove', this.touchdragHandler, false);
		document.addEventListener('touchend', this.stopDragHandler, false)
		document.addEventListener('touchcancel', this.stopDragHandler, false)
		window.blockMenuHeaderScroll = false

		const evType = e.type;
		if (evType === 'mouseup'){
			const { offsetX, offsetY } = calcOffset(this.clock, e.clientX, e.clientY)
			this.handlePoint(offsetX, offsetY, true)
		} else if (evType === 'touchcancel' || evType === 'touchend'){
			const touch = e.targetTouches[0];
			if (touch){
				const { offsetX, offsetY } = calcOffset(this.clock, touch.clientX, touch.clientY)
				this.handlePoint(offsetX, offsetY, true)
			}
		}
	}

	componentWillUnmount(){
		// clear any event listeners
		this.stopDragHandler()
	}
}



Clock.propTypes = {
	config: PropTypes.object.isRequired,
	hour: PropTypes.number.isRequired,
	minute: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	
	changeHour: PropTypes.func.isRequired,
	changeMinute: PropTypes.func.isRequired,
	clockWrapperEl: PropTypes.object
}

export default Radium(Clock)