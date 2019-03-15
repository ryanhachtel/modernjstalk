import React, { Component } from 'react';
import { Input, Button, Form, Container, Grid, Icon } from 'semantic-ui-react'
import TodoList from './TodoList';

class TodoBuilder extends Component {
	constructor(props) {
		super(props);
		
		// Defining the starting app state
		this.state = {
			todoList: [
				{ 'info': 'Completed Application', 'isCompleted': false, id: 1 },
				{ 'info': 'Win a million dollars', 'isCompleted': false, id: 2 }
			],
			filter: 'all',
			info: '',
			counter: 3
		};

		// Binding the action functions to this, so they have the context they require
		this.addTodo = this.addTodo.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.handleInfoChange = this.handleInfoChange.bind(this);
		this.markTodoComplete = this.markTodoComplete.bind(this);
		this.markTodoUncomplete = this.markTodoUncomplete.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.removeAllCompleted = this.removeAllCompleted.bind(this);
	}

	// Updates info state as the user types in their todo
	handleInfoChange(event) {
		this.setState({ info: event.target.value });
	}

	// Adds a new todo to the todoList
	addTodo() {
		event.preventDefault();
		const { todoList, counter } = this.state;

		const newTodo = {
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
	updateFilter(filter) {
		this.setState({ filter: filter });
	}

	// Marks a specific todo as complete and updates the todoList
	markTodoComplete(id) {
		const { todoList } = this.state;
		todoList.forEach((item) => {
			if (item.id === id) {
				item.isCompleted = true;
			}
		});
		this.setState({ todoList: todoList });
	}

	// Marks a specific todo as uncomplete and updates the todoList
	markTodoUncomplete(id) {
		const { todoList } = this.state;
		todoList.forEach((item) => {
			if (item.id === id) {
				item.isCompleted = false;
			}
		});
		this.setState({ todoList: todoList });
	}

	// Deletes a specific todo from the todoList
	deleteTodo(id) {
		const { todoList } = this.state;
		const toRemoveIndex = todoList.findIndex(todo => todo.id === id);
		todoList.splice(toRemoveIndex, 1);

		this.setState({ todoList: todoList});
	}
	
	// Deletes all completed todos from the todoList
	removeAllCompleted() {
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
						<Input placeholder='Todo' size='large' icon='plus' value={this.state.info} onChange={this.handleInfoChange} />
					</Form.Field>
					<Button type='submit'>Submit</Button>
				</Form>
				<br />
				<Container>
					<Grid divided='vertically'>
						<Grid.Row columns={3}>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter('completed')}>
									Show Only Completed
									<Icon name='filter' />
								</Button>
							</Grid.Column>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter('uncompleted')}>
									Show Only Uncompleted
									<Icon name='filter' />
								</Button>
							</Grid.Column>
							<Grid.Column textAlign='center'>
								<Button size='large' icon labelPosition='left' onClick={() => this.updateFilter('all')}>
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
