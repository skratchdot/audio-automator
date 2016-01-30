import { combineReducers } from 'redux';
import audioAutomator from './audioAutomator';
import audioContext from './audioContext';
import gain from './gain';
import now from './now';
import source from './source';
import { routeReducer } from 'redux-simple-router';

const rootReducer = combineReducers({
  audioAutomator,
  audioContext,
  gain,
  now,
  source,
  routing: routeReducer
});

export default rootReducer;
