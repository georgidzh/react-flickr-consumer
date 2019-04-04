import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import NotFoundRoute from './NotFoundRoute';

const Routes = () => (
  <div className="page-content">
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
  </div>
);

export default Routes;
