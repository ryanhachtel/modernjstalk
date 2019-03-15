import * as React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Header, Divider } from 'semantic-ui-react';
import ErrorBoundary from './ErrorBoundary';
// import TodoBuilder from './TodoBuilderHooks';
import LoadAppButton from './LoadAppButton';

// Start of our Component Tree
// Bulk of the logic lives in TodoBuilder
const Todo = () => {
	const [loadApp, setLoadApp] = React.useState(false);

	// Set chrome throttling to slow 3G
	const TodoBuilder = React.lazy(() => import('./TodoBuilderHooks'));
	return (
		<div>
			<Header size='huge' textAlign='center'>TodoMVC</Header>
			<Divider section />
			<ErrorBoundary>
				{loadApp ?
					<React.Suspense fallback={<div>Fallback</div>}>
						<TodoBuilder />
					</React.Suspense> :
					<LoadAppButton load={setLoadApp} /> 
				}
			</ErrorBoundary>
		</div>
	);
}

export default Todo;
