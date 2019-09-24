import { configure, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

expect.extend({
	toExist(el: ReactWrapper) {
		if (el.exists()) {
			return {
				message: () => `expected element is rendered`,
				pass: true,
			}
		}
		return {
			message: () => `expected element to be rendered`,
			pass: false,
		}
	},
})

// TODO - fix warnings
declare global {
	namespace jest {
		interface Matchers<R> {
			toExist(): R
		}
	}
}
