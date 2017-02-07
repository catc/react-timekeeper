import { keyframes } from 'radium';

export const popInOut = keyframes({
	'from': { transform: 'scale(1)' },
	'30%': { transform: 'scale(0.88)' },
	'60%': { transform: 'scale(1.05)' },
	'to': { transform: 'scale(1)' },
}, 'popInOut')

export const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
}, 'fadeIn');