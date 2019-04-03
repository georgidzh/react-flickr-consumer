import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

export const history = createBrowserHistory();


export default function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk),
  ];

  if (process.env.NODE_ENV !== 'production') {
    // enhancers.push(applyMiddleware(createLogger()));
    window.__REDUX_DEVTOOLS_EXTENSION__ && enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(createRootReducer(history), initialState, compose(...enhancers));

  return store;
}
