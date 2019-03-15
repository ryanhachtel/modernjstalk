import * as React from 'react';

interface IErrorBoundaryProps {
	children: React.ReactElement;
}

interface IErrorBoundaryState {
	hasError: boolean;
}
// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		// You can also log the error to an error reporting service
		console.log(`${error.name} - ${info.componentStack}`);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children; 
	}
}

export default ErrorBoundary;
