import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import Radium, { StyleRoot } from 'radium'

import parseTime from '../helpers/parse-time'
import composeTime from '../helpers/compose-time'
import ClockWrapper from './ClockWrapper'
import Time from './Time'

import * as defaultConfig from '../helpers/config';

export class Timepicker extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			...parseTime(props.time),
			unit: 'hour'
		}

		// override any default styles
		const config = Object.assign({}, defaultConfig, props.config)
		this.config = config

		this.changeHour =  this.handleTimeChange.bind(this, 'hour')
		this.changeMinute =  this.handleTimeChange.bind(this, 'minute')
		this.changeUnit =  this.changeUnit.bind(this)
		this.changeMeridiem = this.handleMeridiemChange.bind(this)

		this.timeChangeHandler = null;
		if (typeof props.onChange === 'function') {
			this.timeChangeHandler = debounce(() => {
				this.props.onChange(this.getTime())
			}, 80)
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.time){
			this.setState(parseTime(nextProps.time))
		}
	}

	getTime(){
		const state = this.state;
		return composeTime(state.hour, state.minute, state.meridiem);
	}

	handleTimeChange(unit, val, canChangeUnit){
		val = parseInt(val, 10);
		if (isNaN(val)){
			return
		}
		if (unit === 'hour' && val === 0){
			val = 12
		} else if (unit === 'minute' && val === 60){
			val = 0
		}

		this.setState({
			[unit]: val
		}, this.timeChangeHandler) // update time on parent

		const props = this.props

		if (canChangeUnit && unit === 'hour' && props.switchToMinuteOnHourSelect){
			this.changeUnit('minute')
		} else if (canChangeUnit && unit === 'minute' && props.closeOnMinuteSelect){
			props.onDoneClick && props.onDoneClick(this.getTime())
		}
	}
	handleMeridiemChange(val){
		if (val !== this.state.meridiem){
			this.setState({
				meridiem: val
			}, this.timeChangeHandler) // update on parent
		}
	}

	changeUnit(newUnit){
		const currentUnit = this.state.unit;
		if (currentUnit === newUnit){
			return;
		}
		this.setState({ unit: newUnit })
	}

	render(){
		const config = this.config
		const styles = {
			timePicker: {
				fontFamily: config.FONT_FAMILY,
				background: config.TIMEPICKER_BACKGROUND,
				borderRadius: '3px',
				display: 'inline-block',
				// boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				boxShadow: '0 3px 6px rgba(0,0,0,0.13), 0 3px 6px rgba(0,0,0,0.19)', 	// bigger
				width: '260px',
				position: 'relative',
				userSelect: 'none',
			},
			doneButton: {
				display: 'block',
				color: config.DONE_BUTTON_COLOR,
				textTransform: 'uppercase',
				borderTop: '1px solid ' + config.DONE_BUTTON_BORDER_COLOR,
				textAlign: 'center',
				cursor: 'pointer',
				padding: '16px 0',
				fontSize: '13px',
				letterSpacing: '0.5px',
				lineHeight: 'normal',
				fontWeight: 500
			}
		}

		const state = this.state
		return (
			<StyleRoot style={styles.timePicker} className="react-timekeeper">
				<style>{`
					.react-timekeeper {
						-webkit-tap-highlight-color: transparent;
						-webkit-font-smoothing: antialiased;
						font-smoothing: antialiased;
					}
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
				`}</style>

				<Time
					config={this.config}
					unit={state.unit}
					hour={state.hour}
					minute={state.minute}
					meridiem={state.meridiem}

					changeMeridiem={this.changeMeridiem}
					changeHour={this.changeHour}
					changeMinute={this.changeMinute}
					changeUnit={this.changeUnit}
				/>
				
				<ClockWrapper
					config={this.config}
					unit={state.unit}
					hour={state.hour}
					minute={state.minute}
					meridiem={state.meridiem}

					changeHour={this.changeHour}
					changeMinute={this.changeMinute}
					changeMeridiem={this.changeMeridiem}
				/>
				
				{this.props.onDoneClick && <span style={styles.doneButton} onClick={e=>this.props.onDoneClick(this.getTime(), e)}>Done</span> }
			</StyleRoot>
		)
	}
}


Timepicker.propTypes = {
	time: PropTypes.string,
	onChange: PropTypes.func,
	
	onDoneClick: PropTypes.func,
	switchToMinuteOnHourSelect: PropTypes.bool,
	closeOnMinuteSelect: PropTypes.bool,
	config: PropTypes.object
}

export default Radium(Timepicker)