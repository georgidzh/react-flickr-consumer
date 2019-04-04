import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/config';
import { history } from './store/config';
import { ConnectedRouter } from 'connected-react-router'

export default function Root(props) {
  return (
    <Provider store={configureStore(props.initialState)}>
      <ConnectedRouter history={history}>
        {props.children}
      </ConnectedRouter>`
    </Provider>
  );
}
