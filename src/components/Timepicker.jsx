import React, { PropTypes } from 'react'

import Clock from './Clock'
import Time from './Time'

import css from 'reactcss'

class Timepicker  extends React.Component {
	/*constructor(props){
		super(props)
		this.state = {}
	}*/
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
				<Clock />

				<span style={styles.doneButton}>Done</span>
				

			</div>
		)
	}
				/*<div style={{
					border: '1px solid #DDD',
					margin: '50px'
				}}>

					<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"
						style={{
							border: '1px solid red'
						}}
					>
						<line x1="120" y1="120" x2="120" y2="0"
							// transformOrigin="0px 0px" 
							strokeWidth="1" 
							stroke="black"
							transform="rotate(0 120 120)"
						/>
					</svg>





				</div>*/
}
/*const Timepicker = ({}) => {
	return (
		<div>
			timepicker

			<Clock />
		</div>
	)
}*/

Timepicker.propTypes = {

}

export default Timepicker