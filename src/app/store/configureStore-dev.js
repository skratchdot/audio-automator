import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
  const storeEnhancers = [];
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const enableDevtools = process.env.DEVTOOLS !== 'disabled';
  storeEnhancers.push(applyMiddleware(thunk, reduxRouterMiddleware));
  if (enableDevtools) {
    storeEnhancers.push(DevTools.instrument());
  }
  const store = compose(...storeEnhancers)(createStore)(rootReducer, initialState);
  if (enableDevtools) {
    reduxRouterMiddleware.listenForReplays(store);
  }
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
