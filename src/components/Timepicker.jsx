import React, { PropTypes } from 'react'

import ClockWrapper from './ClockWrapper'
import Time from './Time'

import css from 'reactcss'

function parseTime(time){
	// if valid color, return parsed version, other return 12:00
	return {
		hour: 12,
		minute: 0,
		meridian: 'pm'
	}
}

class Timepicker  extends React.Component {
	constructor(props){
		super(props)

		// TODO - init with any number passed in
		this.state = {
			minute: 10,
			hour: 8,

			// need better name
			selectedType: 'hour'
		}
	}

	handleChange(type, val){

	}
	// TODO - need better naming
	changeType(newType){
		const currentType = this.state.type;
		if (currentType === newType){
			return;
		}
		this.setState({ type: newType })
	}

	render(){
		const styles = css({
			default: {
				timePicker: {
					fontFamily: '"Roboto", serif',
					background: '#F2F2F2',
					borderRadius: '3px',
					// border: '1px solid #DDD',
					display: 'inline-block',
					// boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
					boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', 	// bigger
					width: '300px'
				},
				doneButton: {
					display: 'block',
					color: '#000000',
					textTransform: 'uppercase',
					borderTop: '1px solid #CCC',
					textAlign: 'center',
					cursor: 'pointer',
					padding: '20px 0',
					fontSize: '14px',
					letterSpacing: '0.5px',
					fontWeight: 500
				}
			}
		})

		return (
			<div style={styles.timePicker}>
				<Time />
				<ClockWrapper/>

				<span style={styles.doneButton}>Done</span>
				
			</div>
		)
	}
}


Timepicker.propTypes = {
	time: PropTypes.string,
	onChange: PropTypes.func,
	displayDone: PropTypes.bool,
	doneOnClick: PropTypes.func
}

export default Timepicker