import React, { PropTypes } from 'react'

import css from 'reactcss'

const DEFAULT_TEXT_COLOR = '#8C8C8C';
const SELECTED_TEXT_COLOR = '#8EDDFD';

class Time extends React.Component {
	constructor(props){
		super(props)
		this.toggleMeridiem = this.toggleMeridiem.bind(this)
		this.changeUnitToHour = props.changeUnit.bind(null, 'hour')
		this.changeUnitToMinute = props.changeUnit.bind(null, 'minute')
	}
	toggleMeridiem(){
		if (this.props.meridiem === 'am'){
			this.props.changeMeridiem('pm')
		} else {
			this.props.changeMeridiem('am')
		}
	}

	render(){
		const props = this.props;

		const styles = css({
			default: {
				wrapper: {
					background: 'white',
					padding: '24px',
					textAlign: 'center',
				},
				timeWrapper: {
					width: '220px',
					left: '26px',
					position: 'relative'
				},
				colon: {
					color: DEFAULT_TEXT_COLOR,
					// fontWeight: '500',
					display: 'inline-block',
					fontSize: '56px',
				},
				time: {
					color: DEFAULT_TEXT_COLOR,
					// fontWeight: '500',
					display: 'inline-block',
					fontSize: '56px',
					cursor: 'pointer',
					userSelect: 'none',
				},
				meridiem: {
					color: DEFAULT_TEXT_COLOR,
					display: 'inline-block',
					fontSize: '13px',
					textTransform: 'uppercase',
					marginLeft: '8px',
					fontWeight: '500',
				}
			},
			isHour: {
				hour: {
					color: SELECTED_TEXT_COLOR
				}
			},
			isMinute: {
				minute: {
					color: SELECTED_TEXT_COLOR
				}
			}
		}, {
			isHour: props.unit === 'hour',
			isMinute: props.unit === 'minute'
		})
		const formattedMinute = ('0' + props.minute).slice(-2)

		return <div style={styles.wrapper}>
			<div style={styles.timeWrapper}>
				<span style={{
					...styles.time,
					...styles.hour
				}} onClick={this.changeUnitToHour}>{props.hour}</span>
				
				<span style={styles.colon}>:</span>
				
				<span style={{
					...styles.time,
					...styles.minute
				}} onClick={this.changeUnitToMinute}>{formattedMinute}</span>
				
				<button onClick={this.toggleMeridiem} style={styles.meridiem}>{props.meridiem}</button>
			</div>
		</div>
	}
}

Time.propTypes = {
	meridiem: PropTypes.string.isRequired,

	changeUnit: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

export default Time