import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import NotFoundRoute from './NotFoundRoute';

const Routes = () => (
  <React.Fragment>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
      <Redirect from="/" to="/recent" />
      <Route component={NotFoundRoute} />
    </Switch>
  </React.Fragment>
);

export default Routes;
