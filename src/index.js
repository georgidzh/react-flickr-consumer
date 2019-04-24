import 'react-app-polyfill/ie9';
import 'es7-object-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router-dom';

import './styles/app.scss';

import Root from './Root';
import App from './components/App/App';

ReactDOM.render(
  <Root>
      <Route path="/" component={App} />
  </Root>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
