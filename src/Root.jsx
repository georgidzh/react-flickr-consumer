import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/config';

export default function Root(props) {
  return (
    <Provider store={configureStore(props.initialState)}>
      {props.children}
    </Provider>
  );
}
