import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import { history } from './store/config';
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router-dom';

import './styles/app.scss';

import Root from './Root';
import App from './components/App/App';

ReactDOM.render(
  <Root>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>`
  </Root>,
  document.getElementById('root')
)