import React, { PropTypes } from 'react'
import Radium from 'radium'
import { fadeIn } from '../helpers/animations';

class TimeDropdown extends React.Component {
	constructor(props){
		super(props)

		this.elsewhereClick = this.elsewhereClick.bind(this)
		this.selectTime = this.selectTime.bind(this)
	}

	componentDidMount(){
		this.container.scrollTop = this.selected.offsetTop

		document.addEventListener('click', this.elsewhereClick, false)
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.elsewhereClick, false)

		this.enableBodyScroll()
	}

	elsewhereClick(e){
		const parent = this.container
		const child = e.target
		
		let node = child.parentNode;
		while (node != null) {
			if (node === parent) {
				return
			}
			node = node.parentNode;
		}
		this.props.close()
	}

	selectTime(val){
		// select time
		this.props.updateVal(val)

		// then close
		this.props.close()
	}

	disableBodyScroll(){
		document.body.classList.add('react-timekeeper-noscroll')
	}
	enableBodyScroll(){
		document.body.classList.remove('react-timekeeper-noscroll')
	}
	

	render(){
		const props = this.props;
		const config = props.config;
		const styles = {
			wrapper: {
				position: 'absolute',
				display: 'inline-block',
				background: 'white',
				border: '1px solid ' + config.DROPDOWN_BORDER,
				borderRadius: '2px',
				padding: '6px 0',
				zIndex: '20',
				top: 74,
				height: '280px',
				overflowY: 'auto',
				boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				opacity: 0,
				animation: 'x 0.2s ease-out both',
				animationName: fadeIn
			},
			'wrapper-hour': {
				right: -8,
			},
			'wrapper-minute': {
				left: -10
			},
			options: {
				position: 'relative',
				listStyle: 'none',
				padding: 0,
				margin: 0
			},
			option: {
				background: 'transparent',
				padding: '8px 30px',
				fontSize: '18px',
				color: config.DROPDOWN_COLOR,
				cursor: 'pointer',
				':hover': {
					background: config.DROPDOWN_SELECTED_COLOR
				}
			}
		}

		const val = props.val.toString()

		return (
			<div
				style={[styles.wrapper, styles[`wrapper-${props.type}`]]}
				ref={el => this.container = el}
				onMouseEnter={this.disableBodyScroll}
				onMouseLeave={this.enableBodyScroll}
			>
				<ul style={styles.options}>
					{this.props.options.map(opt =>
						<li
							key={opt}
							style={{
								...styles.option,
								background: opt === val ? config.DROPDOWN_SELECTED_COLOR : ''
							}}
							ref={el => {opt === val ? this.selected = el : ''}}
							onClick={() => this.selectTime(opt)}
						>
							{opt}
						</li>
					)}
				</ul>
			</div>
		)
	}
}

TimeDropdown.propTypes = {
	config: PropTypes.object.isRequired,
	val: PropTypes.number.isRequired,
	options: PropTypes.array.isRequired,
	close: PropTypes.func.isRequired,
	updateVal: PropTypes.func.isRequired,
}

export default Radium(TimeDropdown)
