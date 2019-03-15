import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import TodoBuilder from '../components/TodoBuilder';

it('Correctly adds a new todo', () => {
	const { getByTestId, getByLabelText, getByText } = render(<TodoBuilder />);

	// Type todo info
	const todoInput = getByLabelText('addNewTodoText');
	fireEvent.change(todoInput, { target: {value: 'Write a Test'} } );
	//@ts-ignore
	expect(todoInput.value).toBe('Write a Test');

	// Hit Submit
	const todoSubmit = getByTestId('addNewTodoSubmit');
	fireEvent.click(todoSubmit);
	//@ts-ignore
	expect(todoInput.value).toBe('');

	// Check for new todo
	const todo = getByText('Write a Test');
	expect(todo).toBeTruthy();
});