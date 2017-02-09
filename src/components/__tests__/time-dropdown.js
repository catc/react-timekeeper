import { shallow } from 'enzyme';
import React from 'react'
import renderer from 'react-test-renderer'

import { TimeDropdown } from '../TimeDropdown';

const OPTIONS = Array.apply(null, {length: 5}).map((a, i) => (i + 1).toString())

describe('TimeDropdown component', () => {
	const closeFn = jest.fn();
	const updateValFn = jest.fn();

	test('renders correctly', () => {
		const val = 3
		const tree = renderer.create(
			<TimeDropdown
				config={{}}
				val={val}
				options={[1,2,3,4,5].map(v => v.toString())}
				close={closeFn}
				updateVal={updateValFn}
			/>, {
				createNodeMock: function(el){
					if (el.type === 'div'){
						// allow for setting scrollTop in `componentDidMount` method
						// otherwise throws error: `Can't add property scrollTop, object is not extensible`
						return Object.assign({}, el, {scrollTop: ''})
					}
					return el
				}
			}
		).toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('triggers close and updateVal on selecting option', () => {
		const indexToSelect = 2
		const rendered = shallow(
			<TimeDropdown
				config={{}}
				val={4}
				options={OPTIONS}
				close={closeFn}
				updateVal={updateValFn}
			/>
		)
		rendered.find('ul').childAt(indexToSelect).simulate('click');
		expect(closeFn.mock.calls.length).toBe(1);
		expect(updateValFn.mock.calls.length).toBe(1);
		expect(updateValFn).lastCalledWith( (indexToSelect + 1).toString() );
	})
})