export interface ITodo {
	info: string,
	isCompleted: boolean,
	id: number
}

export interface ITodoBuilderState {
	todoList: ITodo[],
	filter: Filters,
	info: string,
	counter: number
}

export interface ITodoListProps {
	todoList: ITodo[],
	filter: Filters,
	markTodoComplete: ((id: number) => void),
	markTodoUncomplete: ((id: number) => void),
	deleteTodo: ((id: number) => void)
}

export enum Filters {
	all,
	completed,
	uncompleted
}