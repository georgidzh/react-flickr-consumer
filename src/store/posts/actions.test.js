import { setLoading } from './actions';
import {
  SET_IS_LOADING,
  // GET_POSTS_SUCCESS,
  // SET_SEARCH,
  // RESET_STATE,
  // UPDATE_POSTS,
} from './action-types';

describe('Posts actions', () => {
  it('action creators has the correct type and payload', () => {
    const action = setLoading(true);
    expect(action).toEqual({ type: SET_IS_LOADING, payload: true });
  });
});
