import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';

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