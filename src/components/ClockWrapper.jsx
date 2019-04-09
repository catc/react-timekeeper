import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Clock from './Clock'

const MERIDIEM_SELECT_SIZE = 38;

export class ClockWrapper extends React.Component {
	componentDidMount(){
		// force passing clockWrapperEl to child
		this.forceUpdate()
	}
	render(){
		const props = this.props
		const config = props.config

		const styles = {
			clockWrapper: {
				textAlign: 'center',
				padding: '18px 0 14px',
				background: config.CLOCK_WRAPPER_BACKGROUND,
			},
			meridiemWrapper: {
				textAlign: 'left',
				padding: '0 30px',
				marginTop: '-16px',
				position: 'relative',
				zIndex: 10
			},
			meridiem: {
				background: config.CLOCK_WRAPPER_MERIDIEM_BACKGROUND,
				fontSize: '14px',
				color: config.CLOCK_WRAPPER_MERIDIEM_COLOR,
				display: 'inline-block',
				padding: 0,
				cursor: 'pointer',
				borderRadius: '99px',
				width: MERIDIEM_SELECT_SIZE,
				height: MERIDIEM_SELECT_SIZE,

				textAlign: 'center',
				lineHeight: MERIDIEM_SELECT_SIZE + 'px',
				transition: '0.15s ease-out',
				fontFamily: config.FONT_FAMILY,
			},
			meridiemRight: {
				float: 'right',
			},
			meridiemSelected: {
				background: config.CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED,
				color: config.CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED
			}
		}

		return (
			<div style={styles.clockWrapper} className="react-timekeeper__clock-wrapper" ref={el => this.clockWrapperEl = el}>
				<Clock
					config={props.config}
					hour={props.hour}
					hour24={props.hour24}
					minute={props.minute}
					unit={props.unit}

					changeHour={props.changeHour}
					changeMinute={props.changeMinute}
					clockWrapperEl={this.clockWrapperEl}
				/>

				{props.mode === 'hour' &&
				<div style={styles.meridiemWrapper} className="react-timekeeper__meridiem-toggle-wrapper">
					<button
						type="button"
						className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle type_am "
						style={[
							styles.meridiem,
							props.meridiem === 'am' && styles.meridiemSelected
						]}
						onClick={() => { props.changeMeridiem('am') }}
					>AM</button>
					<button
						type="button"
						className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle type_pm"
						style={[
							styles.meridiem,
							styles.meridiemRight,
							props.meridiem === 'pm' && styles.meridiemSelected
						]}
						onClick={() => { props.changeMeridiem('pm') }}
					>PM</button>
				</div>
				}
			</div>
		)
	}
}

ClockWrapper.propTypes = {
	config: PropTypes.object.isRequired,
	mode: PropTypes.oneOf(['hour', 'hour24']),
	unit: PropTypes.string.isRequired,
	hour: PropTypes.number,
	hour24: PropTypes.number,
	minute: PropTypes.number.isRequired,
	meridiem: PropTypes.string.isRequired,

	changeHour: PropTypes.func.isRequired,
	changeMinute: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

ClockWrapper.defaultProps = {
	mode: 'hour'
}

export default Radium(ClockWrapper)