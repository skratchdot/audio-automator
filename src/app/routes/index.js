import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
const packageInfo = require('../../../package.json');

// pages
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import About from '../pages/About';
import Demo from '../pages/Demo';

const routes = (
	<Route component={App}>
		<Route path={`/${packageInfo.name}`} component={Home} />
		<Route path={`/${packageInfo.name}/home`} component={Home} />
		<Route path={`/${packageInfo.name}/about`} component={About} />
		<Route path={`/${packageInfo.name}/demo`} component={Demo} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
