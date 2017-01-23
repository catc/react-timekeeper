import React, { PropTypes } from 'react'

import css from 'reactcss'

/*const Clock = ({}) => {
	return <div>Clock: 0 5 10 15 20 25...</div>
}*/

const DEFAULT_TEXT_COLOR = '#8C8C8C';
const SELECTED_TEXT_COLOR = '#8C8C8C';

class Time extends React.Component {
	render(){
		const styles = css({
			default: {
				timeWrapper: {
					background: 'white',
					padding: '24px',
					textAlign: 'center',
				},
				time: {
					color: DEFAULT_TEXT_COLOR,
					// fontWeight: '500',
					display: 'inline-block',
					fontSize: '56px',
				},
				meridiem: {
					color: DEFAULT_TEXT_COLOR,
					display: 'inline-block',
					fontSize: '13px',
					textTransform: 'uppercase',
					marginLeft: '8px',
					fontWeight: '500',
				}
			}
		})
		const props = this.props
		const formattedMinute = ('0' + props.minute).slice(-2)

		return <div style={styles.timeWrapper}>
			<span style={styles.time}>{props.hour}</span>
			<span style={styles.time}>:</span>
			<span style={styles.time}>{formattedMinute}</span>
			<span style={styles.meridiem}>{props.meridiem}</span>
		</div>
	}
}

export default Time