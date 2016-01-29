import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes';
const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById('app')
);
