import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFoundRoute from './NotFoundRoute';

const RecentRoute = (
  lazy(() => import('./RecentRoute'))
);

const SavedRoute = (
  lazy(() => import('./SavedRoute'))
);

const Routes = () => (
  <div className="page-content">
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/recent">
          <RecentRoute />
        </Route>
        <Route exact path="/saved">
          <SavedRoute />
        </Route>
        <Redirect from="/" to="/recent" />
        <Route component={NotFoundRoute} />
      </Switch>
    </Suspense>
  </div>
);

export default Routes;
