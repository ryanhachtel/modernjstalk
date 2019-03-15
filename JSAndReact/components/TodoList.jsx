import React, { Component } from 'react';
import { List, Button } from 'semantic-ui-react';

class TodoList extends Component {
	constructor(props) {
		super(props);

		// Bind helper function to this context
		this.buildTodoActions = this.buildTodoActions.bind(this);
	}

	// Depending of if the todo is completed or not,
	// builds an array of the buttons to show for that todo like 'Mark Complete' 
	buildTodoActions(todoItem, markTodoComplete, markTodoUncomplete, deleteTodo) {
		const buttons = [];

		todoItem.isCompleted ?
			(buttons.push(
				<Button
					key='done'
					icon='ban'
					name='check'
					size='large'
					onClick={() => markTodoUncomplete(todoItem.id)} 
				/>
			)) :
			(buttons.push(
				<Button
					key='notdone'
					icon='check circle outline'
					name='check'
					size='large'
					onClick={() => markTodoComplete(todoItem.id)}
				/>
			));
		
		// Every todo gets a delete button
		buttons.push(
			<Button
				key='delete'
				icon='trash'
				name='trash'
				size='large'
				onClick={() => deleteTodo(todoItem.id)}
			/>
		);
		return (buttons);
	}

	render() {
		// Destructure the state variables
		const { todoList, filter, markTodoComplete, markTodoUncomplete, deleteTodo } = this.props;

		// Using the filter variables, filter the
		// todoList to show the specified todos
		let todoListToDisplay = [];
		switch(filter) {
			case 'completed':
				todoListToDisplay = todoList.filter(todo => todo.isCompleted === true);
				break;
			case 'uncompleted':
				todoListToDisplay = todoList.filter(todo => todo.isCompleted === false);
				break;
			case 'all':
				todoListToDisplay = todoList;
				break;
			default:
				break;
		}

		// Map the todos to List Items
		const todos = todoListToDisplay.map(todoItem => {
			return (
				<List.Item key={todoItem.id}>
					<List.Content floated='right'>
						{this.buildTodoActions(todoItem, markTodoComplete, markTodoUncomplete, deleteTodo)}
					</List.Content>
					{todoItem.isCompleted ? 
						<List.Icon name='thumbs up' size='large'/>
						: <List.Icon name='pointing right' size='large' />
					}
					<List.Content>
						<List.Header as='h3' className={todoItem.isCompleted ? 'completed' : 'uncompleted'}>
							{todoItem.info}
						</List.Header>
					</List.Content>
				</List.Item>
			);
		})
		return (
			<div>
				<List divided verticalAlign='middle'>
					{todos}
				</List>
			</div>
		);
	}
}

export default TodoList;
