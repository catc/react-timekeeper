import React, { PropTypes } from 'react'
import Radium from 'radium'

import TimeDropdown from './TimeDropdown'
import { CLOCK_DATA } from '../helpers/data';
import { popInOut } from '../helpers/animations';

export class Time extends React.Component {
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
		const config = props.config;
		const styles = {
			wrapper: {
				background: config.TIME_BACKGROUND,
				padding: '14px 16px',
				borderRadius: '3px 3px 0 0',
			},
			timeWrapper: {
				left: 20,
				position: 'relative'
			},
			colon: {
				color: config.TIME_DEFAULT_COLOR,
				fontWeight: '500',
				display: 'inline-block',
				fontSize: '46px',
				verticalAlign: '2px',
				margin: '0 5px',
				lineHeight: 'normal'
			},
			time: {
				color: config.TIME_DEFAULT_COLOR,
				display: 'inline-block',
				fontSize: '48px',
				cursor: 'pointer',
				userSelect: 'none',
				lineHeight: 'normal'
			},
			'timeSelected': {
				color: config.TIME_SELECTED_COLOR,
				animation: 'x 0.6s ease-out both',
				animationName: popInOut
			},
			hourWrapper: {
				width: '72px',
				textAlign: 'right',
				position: 'relative',
				display: 'inline-block'
			},
			minuteWrapper: {
				position: 'relative',
				display: 'inline-block',
			},
			meridiem: {
				color: config.TIME_DEFAULT_COLOR,
				display: 'inline-block',
				fontSize: '13px',
				textTransform: 'uppercase',
				marginLeft: '2px',
				padding: '10px 8px',
				verticalAlign: '1px',
				fontFamily: config.FONT_FAMILY,
			},
		}

		const formattedMinute = ('0' + props.minute).slice(-2)

		return (
			<div style={styles.wrapper}>

				<div style={styles.timeWrapper}>

					<div style={styles.hourWrapper}>
						<span
							className="react-timekeeper__hour-select"
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
								config={props.config}
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
							className="react-timekeeper__minute-select"
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
								config={props.config}
								type='minute'
								updateVal={props.changeMinute}
								val={props.minute}
								options={ CLOCK_DATA[props.unit].dropdownOptions }
								close={this.closeMinuteSelect}
							/>
						: ''}
					</div>


					<button
						type="button"
						onClick={this.toggleMeridiem}
						style={styles.meridiem}
						className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle"
					>
						{props.meridiem}
					</button>
				</div>
			</div>
		)
	}
}

Time.propTypes = {
	config: PropTypes.object.isRequired,
	unit: PropTypes.string.isRequired,
	meridiem: PropTypes.string.isRequired,

	changeUnit: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

export default Radium(Time)