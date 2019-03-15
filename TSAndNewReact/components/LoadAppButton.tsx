import * as React from 'react';
import { Button } from 'semantic-ui-react';

interface ILoadAppButton {
	load: Function;
}
const LoadAppButton: React.FunctionComponent<ILoadAppButton> = ({ load }) => {
	return(
		<Button icon='code' onClick={() => load(true)} />
	);
}

export default LoadAppButton;
