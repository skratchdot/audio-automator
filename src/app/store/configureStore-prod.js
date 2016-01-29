import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const store = compose(
    applyMiddleware(thunk, reduxRouterMiddleware)
  )(createStore)(rootReducer, initialState);
  return store;
}
