import * as React from 'react';
import { List, Button } from 'semantic-ui-react';
import { ITodo, ITodoListProps, Filters } from '../types/types';

const TodoList: React.FunctionComponent<ITodoListProps> = ({
	todoList,
	filter,
	markTodoComplete,
	markTodoUncomplete,
	deleteTodo
}) => {
	// Depending of if the todo is completed or not,
	// builds an array of the buttons to show for that todo like 'Mark Complete' 
	const buildTodoActions = (
		todoItem: ITodo,
		markTodoComplete: ITodoListProps["markTodoComplete"],
		markTodoUncomplete: ITodoListProps["markTodoUncomplete"],
		deleteTodo: ITodoListProps['deleteTodo']
	): JSX.Element[] => {

		const buttons: JSX.Element[] = [];

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

	// Using the filter variables, filter the
	// todoList to show the specified todos
	let todoListToDisplay: ITodo[] = [];
	switch(filter) {
		case Filters.completed:
			todoListToDisplay = todoList.filter(todo => todo.isCompleted === true);
			break;
		case Filters.uncompleted:
			todoListToDisplay = todoList.filter(todo => todo.isCompleted === false);
			break;
		case Filters.all:
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
					{buildTodoActions(todoItem, markTodoComplete, markTodoUncomplete, deleteTodo)}
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

export default TodoList;
