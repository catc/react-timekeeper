import Text from '../components/text'
import Link from '../components/link'
import Code, { SYNTAX } from '../components/code'

export default function Other() {
	return (
		<section className="docs-section" id="custom-styles">
			<h2>Custom styles</h2>
			<div className="examples__item">
				<Text>There are two ways of overriding/customizing styles:</Text>
				<Text>
					<strong>CSS variables:</strong> for changing basic styling - mainly
					text colors, background colors, fonts, etc. See{' '}
					<Link
						samePage
						href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
					>
						using CSS variables
					</Link>{' '}
					for more info.
				</Text>
				<Code type={SYNTAX.css}>
					{`// global override
:root {
	--meridiem-bg-color: green;
	--meridiem-text-color: red;
}

// container specific
.foo {
	--meridiem-bg-color: green;
	--meridiem-text-color: red;
}
`}
				</Code>

				<Text>The full list of supported variables are:</Text>
				<Code type={SYNTAX.css}>
					{`// main wrapper
var(--main-box-shadow, 0 3px 11px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.15))
var(--main-bg, white)
var(--main-font-family, 'Roboto', sans-serif)

// top bar
var(--top-bg, white)
var(--top-colon-color, #8C8C8C)
var(--top-text-color, #8C8C8C)
var(--top-selected-color, #8EDDFD)
var(--top-meridiem-color, #8C8C8C)

// time dropdown
var(--dropdown-border, 1px solid #f4f4f4)
var(--dropdown-shadow, 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24))
var(--dropdown-text-color, #8c8c8c)
var(--dropdown-text-color-disabled, #ddd)
var(--dropdown-hover-bg, #EAF8FF)

// clock wrapper
var(--clock-wrapper-bg, #f4f4f4);
var(--clock-bg, white);

// clock hand
var(--hand-line-color, #bceaff);
var(--hand-circle-center, #bceaff);
var(--hand-circle-outer, #e6f7ff);
var(--hand-minute-circle, #ade2fb); // minutes only, dot between intervals

// numbers
var(--numbers-text-color, #999);
var(--numbers-text-color-disabled, #ddd);
var(--numbers-font-size-reg, 16px); // 12h mode only
var(--numbers-font-size-inner, 15px); // 24h mode only
var(--numbers-font-size-outer, 13px); // 24h mode only

// meridiem buttons
var(--meridiem-bg-color, white);
var(--meridiem-text-color, #898989);
var(--meridiem-selected-bg-color, #E1EFF6);
var(--meridiem-selected-text-color, #898989);

// done button
var(--done-bg-color, #f4f4f4);
var(--done-text-color, #686868);
var(--done-border-top, 1px solid #ccc);
var(--done-font-size, 13px);
var(--done-font-weight, 500);
`}
				</Code>

				<hr />
				<Text>
					<strong>Higher CSS specificity:</strong> for more control over css,
					each element has a class name you can override properties with 1 level
					of specifity.
				</Text>
				<Code type={SYNTAX.css}>
					{`// won't work because emotion will override your styles
.react-timekeeper__clock-wrapper {
	background: red;
}

// will work since your specificty is higher
.some-wrapper .react-timekeeper__clock-wrapper {
	background: red;
}`}
				</Code>
			</div>
		</section>
	)
}
