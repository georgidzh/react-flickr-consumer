import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import posts from './posts/reducer';
import ui from './ui/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  posts,
  ui,
});
