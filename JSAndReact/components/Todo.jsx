import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Header, Divider } from 'semantic-ui-react';
import TodoBuilder from './TodoBuilder';

// Start of our Component Tree
// Bulk of the logic lives in TodoBuilder
class Todo extends Component {
	render() {
		return (
			<div>
				<Header size='huge' textAlign='center'>TodoMVC</Header>
				<Divider section />
				<TodoBuilder />
			</div>
		);
	}
}

export default Todo;
