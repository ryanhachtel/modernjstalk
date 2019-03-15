import * as React from 'react';
import TodoBuilder from '../components/TodoBuilder';
import * as renderer from 'react-test-renderer';

test('Renders correctly', () => {
	// @ts-ignore
	const component = renderer.create(<TodoBuilder />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

