import React, { PropTypes } from 'react'
import Radium, { keyframes } from 'radium'

import TimeDropdown from './TimeDropdown'
import {
	CLOCK_DATA
} from '../helpers/constants'

const DEFAULT_TEXT_COLOR = '#8C8C8C';
const SELECTED_TEXT_COLOR = '#8EDDFD';

const popInOut = keyframes({
	'from': { transform: 'scale(1)' },
	'30%': { transform: 'scale(0.88)' },
	'60%': { transform: 'scale(1.05)' },
	'to': { transform: 'scale(1)' },
}, 'popInOut')


class Time extends React.Component {
	constructor(props){
		super(props)
		this.state = {}

		this.toggleMeridiem = this.toggleMeridiem.bind(this)
		this.hourClick = this.hourClick.bind(this)
		this.minuteClick = this.minuteClick.bind(this)
		this.closeHourSelect = this.closeHourSelect.bind(this)
		this.closeMinuteSelect = this.closeMinuteSelect.bind(this)
	}
	toggleMeridiem(){
		if (this.props.meridiem === 'am'){
			this.props.changeMeridiem('pm')
		} else {
			this.props.changeMeridiem('am')
		}
	}

	hourClick(){
		if (this.props.unit !== 'hour'){
			this.props.changeUnit('hour')
		} else {
			this.setState({ showHourSelect: !this.state.showHourSelect })
		}
	}
	closeHourSelect(){
		this.setState({ showHourSelect: false })
	}
	minuteClick(){
		if (this.props.unit !== 'minute'){
			this.props.changeUnit('minute')
		} else {
			this.setState({ showMinuteSelect: !this.state.showMinuteSelect })
		}
	}
	closeMinuteSelect(){
		this.setState({ showMinuteSelect: false })
	}

	render(){
		const props = this.props;

		const styles = {
			wrapper: {
				background: 'white',
				padding: '20px 24px',
				borderRadius: '3px 3px 0 0',
			},
			timeWrapper: {
				left: '22px',
				position: 'relative'
			},
			colon: {
				color: DEFAULT_TEXT_COLOR,
				// fontWeight: '500',
				display: 'inline-block',
				fontSize: '56px',
				verticalAlign: '2px',
				margin: '0 5px'
			},
			time: {
				color: DEFAULT_TEXT_COLOR,
				// fontWeight: '500',
				display: 'inline-block',
				fontSize: '60px',
				cursor: 'pointer',
				userSelect: 'none',
			},
			'timeSelected': {
				color: SELECTED_TEXT_COLOR,
				animation: 'x 0.6s ease-out both',
				animationName: popInOut
			},
			hourWrapper: {
				width: '80px',
				textAlign: 'right',
				position: 'relative',
				display: 'inline-block'
			},
			minuteWrapper: {
				position: 'relative',
				display: 'inline-block',
			},
			meridiem: {
				color: DEFAULT_TEXT_COLOR,
				display: 'inline-block',
				fontSize: '13px',
				textTransform: 'uppercase',
				marginLeft: '2px',
				fontWeight: '500',
				padding: '10px 8px',
				verticalAlign: '1px'
			},
		}

		const formattedMinute = ('0' + props.minute).slice(-2)

		return (
			<div style={styles.wrapper}>

				<div style={styles.timeWrapper}>

					<div style={styles.hourWrapper}>
						<span
							style={[
								styles.time,
								props.unit === 'hour' && styles.timeSelected
							]}
							onClick={this.hourClick}
						>
							{props.hour}
						</span>

						{this.state.showHourSelect ?
							<TimeDropdown
								type='hour'
								updateVal={props.changeHour}
								val={props.hour}
								options={ CLOCK_DATA[props.unit].dropdownOptions }
								close={this.closeHourSelect}
							/>
						: ''}
					</div>
					
					<span style={styles.colon}>:</span>
					
					<div style={styles.minuteWrapper}>
						<span
							style={[
								styles.time,
								props.unit === 'minute' && styles.timeSelected
							]}
							onClick={this.minuteClick}
						>
							{formattedMinute}
						</span>

						{this.state.showMinuteSelect ?
							<TimeDropdown
								type='minute'
								updateVal={props.changeMinute}
								val={props.minute}
								options={ CLOCK_DATA[props.unit].dropdownOptions }
								close={this.closeMinuteSelect}
							/>
						: ''}
					</div>

					
					<button
						onClick={this.toggleMeridiem}
						style={styles.meridiem}
						className="react-timepicker-button-reset"
					>
						{props.meridiem}
					</button>
				</div>
			</div>
		)
	}
}

Time.propTypes = {
	unit: PropTypes.string.isRequired,
	meridiem: PropTypes.string.isRequired,

	changeUnit: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

export default Radium(Time)