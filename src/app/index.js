import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import AudioAutomator from '../lib/AudioAutomator';
import configureStore from './store/configureStore';
import routes from './routes';

// setup default audio graph
const audioContext = new AudioContext();
let numChanges = 0;
audioContext.onstatechange = function () {
	if (numChanges++ === 0) {
		audioContext.suspend();
	}
};
const audioAutomator = new AudioAutomator(audioContext);
const source = audioContext.createBufferSource();
const gain = audioContext.createGain();
source.connect(gain);
gain.connect(audioContext.destination);

const store = configureStore({
	audioAutomator: audioAutomator,
	audioContext: audioContext,
	source: source,
	gain: gain
});

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById('app')
);
