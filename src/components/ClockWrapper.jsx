import React, { PropTypes } from 'react'
import css from 'reactcss'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	render(){
		const props = this.props

		const meridiemSelectSize = 46;
		const styles = css({
			default: {
				clockWrapper: {
					textAlign: 'center',
					padding: '16px 0 14px',
					// background: '#f9f9f9',
					background: '#f4f4f4',
				},
				meridiemWrapper: {
					textAlign: 'left',
					padding: '0 30px',
					marginTop: '-20px',
				},
				meridiem: {
					background: 'white',
					fontSize: '16px',
					color: '#898989',
					display: 'inline-block',
					// position: 'absolute',
					padding: 0,
					cursor: 'pointer',
					borderRadius: '99px',
					width: meridiemSelectSize,
					height: meridiemSelectSize,

					textAlign: 'center',
					lineHeight: meridiemSelectSize + 'px',
					transition: '0.15s ease-out'
				},
				leftMeridiem: {},
				rightMeridiem: {
					float: 'right'
				}
			},
			leftM: {
				leftMeridiem: {
					background: '#E6F7FF'
				}
			},
			rightM: {
				rightMeridiem: {
					background: '#E6F7FF'
				}
			}
		}, {
			leftM: props.meridiem === 'am',
			rightM: props.meridiem === 'pm'
		});

		return (
			<div style={styles.clockWrapper}>
				<Clock
					hour={props.hour}
					minute={props.minute}
					unit={props.unit}

					changeHour={props.changeHour}
					changeMinute={props.changeMinute}
				/>

				{props.hourFormat === 24 ? '' :
					<div style={styles.meridiemWrapper}>
						<button
							className="react-timepicker-button-reset"
							style={{
								...styles.meridiem,
								...styles.leftMeridiem
							}}
							onClick={() => { props.changeMeridiem('am') }}
						>AM</button>
						<button
							className="react-timepicker-button-reset"
							style={{
								...styles.meridiem,
								...styles.rightMeridiem
							}}
							onClick={() => { props.changeMeridiem('pm') }}
						>PM</button>
					</div>
				}
			</div>
		)
	}
}

ClockWrapper.propTypes = {
	unit: PropTypes.string.isRequired,
	hour: PropTypes.number.isRequired,
	minute: PropTypes.number.isRequired,
	meridiem: PropTypes.string.isRequired,
	hourFormat: PropTypes.number,

	changeHour: PropTypes.func.isRequired,
	changeMinute: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

export default ClockWrapper