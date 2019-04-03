import ExploreRoute from './RecentRoute';
import SavedRoute from './SavedRoute';

// eslint-disable-next-line import/prefer-default-export
export default [
  {
    path: '/recent',
    component: ExploreRoute,
    exact: true,
  },
  {
    path: '/saved',
    component: SavedRoute,
    exact: true,
  },
];
