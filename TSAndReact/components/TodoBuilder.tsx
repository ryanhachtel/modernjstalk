import * as React from 'react';
import { Input, Button, Form, Container, Grid, Icon } from 'semantic-ui-react'
import TodoList from './TodoList';
import { ITodo, ITodoBuilderProps, ITodoBuilderState, Filters } from '../types/types';

class TodoBuilder extends React.Component<ITodoBuilderProps, ITodoBuilderState>{
	constructor(props: ITodoBuilderProps) {
		super(props);
		// Defining the starting app state
		this.state = {
			todoList: [
				{ 'info': 'Completed Application', 'isCompleted': false, id: 1 },
				{ 'info': 'Win a million dollars', 'isCompleted': false, id: 2 }
			],
			filter: Filters.all,
			info: '',
			counter: 3
		};
	}

	// Updates info state as the user types in their todo
	handleInfoChange = (event: React.BaseSyntheticEvent) => {
		this.setState({ info: event.target.value });
	}

	// Adds a new todo to the todoList
	addTodo = () => {
		const { todoList, counter } = this.state;

		const newTodo: ITodo = {
			'info': this.state.info,
			'isCompleted': false,
			'id': counter
		};

		// Update the state
		this.setState({
			todoList: [...todoList, newTodo ],
			counter: counter + 1
		});

		// Reset info to empty string
		this.setState({
			info: ''
		});
	}

	// Sets the filter value depending on what filter button was clicked
	updateFilter = (filter: Filters) => {
		this.setState({ filter: filter });
	}

	// Marks a specific todo as complete and updates the todoList
	markTodoComplete = (id: number) => {
		const { todoList } = this.state;
		todoList.forEach((item) => {
			if (item.id === id) {
				item.isCompleted = true;
			}
		});
		this.setState({ todoList: todoList });
	}

	// Marks a specific todo as uncomplete and updates the todoList
	markTodoUncomplete = (id: number) => {
		const { todoList } = this.state;
		todoList.forEach((item: ITodo) => {
			if (item.id === id) {
				item.isCompleted = false;
			}
		});
		this.setState({ todoList: todoList });
	}

	// Deletes a specific todo from the todoList
	deleteTodo = (id: number) => {
		const { todoList } = this.state;
		const toRemoveIndex: number = todoList.findIndex(todo => todo.id === id);
		todoList.splice(toRemoveIndex, 1);

		this.setState({ todoList: todoList});
	}
	
	// Deletes all completed todos from the todoList
	removeAllCompleted = () => {
		const { todoList } = this.state;
		const updatedList = todoList.filter(todo => todo.isCompleted === false);
		this.setState({ todoList: updatedList });
	}

	render() {
		// Destructure state variables
		const { todoList, filter } = this.state;
		return (
			<Container>
				<Form onSubmit={this.addTodo}>
					<Form.Field>
						<Input placeholder='Todo' aria-label='addNewTodoText' size='large' icon='plus' value={this.state.info} onChange={this.handleInfoChange} />
					</Form.Field>
					<Button type='submit' data-testid='addNewTodoSubmit'>Submit</Button>
				</Form>
				<br />
				<Container>
					<Grid divided='vertically'>
						<Grid.Row columns={3}>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter(Filters.completed)}>
									Show Only Completed
									<Icon name='filter' />
								</Button>
							</Grid.Column>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter(Filters.uncompleted)}>
									Show Only Uncompleted
									<Icon name='filter' />
								</Button>
							</Grid.Column>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter(Filters.all)}>
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
						markTodoComplete={this.markTodoComplete}
						markTodoUncomplete={this.markTodoUncomplete}
						deleteTodo={this.deleteTodo}
					/>
				</Container>
				<br />
				<br />
				<Grid divided='vertically'>
					<Grid.Row columns={1}>
						<Grid.Column textAlign='center'>
							<Button size='large' icon labelPosition='left' onClick={() => this.removeAllCompleted()}>
								Remove All Completed
								<Icon name='remove circle' />
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		);
	}
}

export default TodoBuilder;
