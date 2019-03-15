import * as React from 'react';
import { Input, Button, Form, Container, Grid, Icon } from 'semantic-ui-react'
import TodoList from './TodoListHooks';
import { ITodo, Filters } from '../types/types';

const TodoBuilder = () => {
	const [todoList, setTodoList] = React.useState([
		{ 'info': 'Completed Application', 'isCompleted': false, id: 1 },
		{ 'info': 'Win a million dollars', 'isCompleted': false, id: 2 }
	]);

	const [filter, setFilter] = React.useState(Filters.all);
	const [info, setInfo] = React.useState('');
	const [counter, setCounter] = React.useState(3);

	// Updates info state as the user types in their todo
	const handleInfoChange = (event: React.BaseSyntheticEvent) => {
		setInfo(event.target.value);
	}

	// Adds a new todo to the todoList
	const addTodo = () => {
		const newTodo: ITodo = {
			'info': info,
			'isCompleted': false,
			'id': counter
		};

		// Update the state
		const updatedTodoList = todoList.concat([newTodo]);
		setTodoList(updatedTodoList);
		setCounter(counter + 1);

		// Reset info to empty string
		setInfo('')
	}

	// Sets the filter value depending on what filter button was clicked
	const updateFilter = (filter: Filters) => {
		setFilter(filter);
	}

	// Marks a specific todo as complete and updates the todoList
	const markTodoComplete = (id: number) => {
		const updatedTodoList = todoList.map((item) => {
			if (item.id === id) {
				item.isCompleted = true;
			}
			return item;
		});
		setTodoList(updatedTodoList);
	}

	// Marks a specific todo as uncomplete and updates the todoList
	const markTodoUncomplete = (id: number) => {
		const updatedTodoList = todoList.map((item: ITodo) => {
			if (item.id === id) {
				item.isCompleted = false;
			}
			return item;
		});
		setTodoList(updatedTodoList);
	}

	// Deletes a specific todo from the todoList
	const deleteTodo = (id: number) => {
		const updatedTodoList = todoList.filter(item => item.id !== id);
		setTodoList(updatedTodoList);
	}
	
	// Deletes all completed todos from the todoList
	const removeAllCompleted = () => {
		const updatedList = todoList.filter(todo => todo.isCompleted === false);
		setTodoList(updatedList);
	}
	// throw new Error("Whoops!");

	return (
		<Container>
			<Form onSubmit={addTodo}>
				<Form.Field>
					<Input placeholder='Todo' size='large' icon='plus' value={info} onChange={handleInfoChange} />
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
			<br />
			<Container>
				<Grid divided='vertically'>
					<Grid.Row columns={3}>
						<Grid.Column textAlign='center'>
							<Button size='large' icon labelPosition='left' onClick={() => updateFilter(Filters.completed)}>
								Show Only Completed
								<Icon name='filter' />
							</Button>
						</Grid.Column>
						<Grid.Column textAlign='center'>
							<Button size='large' icon labelPosition='left' onClick={() => updateFilter(Filters.uncompleted)}>
								Show Only Uncompleted
								<Icon name='filter' />
							</Button>
						</Grid.Column>
						<Grid.Column textAlign='center'>
							<Button size='large' icon labelPosition='left' onClick={() => updateFilter(Filters.all)}>
								Show All
								<Icon name='list' />
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<br />
				<TodoList
					todoList={todoList}
					filter={filter}
					markTodoComplete={markTodoComplete}
					markTodoUncomplete={markTodoUncomplete}
					deleteTodo={deleteTodo}
				/>
			</Container>
			<br />
			<br />
			<Grid divided='vertically'>
				<Grid.Row columns={1}>
					<Grid.Column textAlign='center'>
						<Button size='large' icon labelPosition='left' onClick={() => removeAllCompleted()}>
							Remove All Completed
							<Icon name='remove circle' />
						</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}

export default TodoBuilder;
