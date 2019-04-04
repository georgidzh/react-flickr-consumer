import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as types from './action-types';
import * as actions from './actions';
import getPage, { responseSuccess } from '../../test-utils/fake-services';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async action get posts', () => {
  it('creates successful request for posts', () => {
    const expectedActions = [
      { type: types.SET_IS_LOADING, payload: false },
      { type: types.GET_POSTS_SUCCESS, payload: responseSuccess },
    ];
    const store = mockStore({
      posts: {
        posts: [],
        isLoading: false,
      },
    });

    return store.dispatch(getPage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Posts actions', () => {
  it('creates an action to set loading to true or false', () => {
    const action = actions.setLoading(true);
    expect(action).toEqual({ type: types.SET_IS_LOADING, payload: true });
  });

  it('creates an action to set posts on success', () => {
    const response = {
      posts: [{ 1: 1 }],
      totalPosts: 42,
      hasMorePosts: true,
      page: 5,
    };
    const expectedAction = {
      payload: response,
      type: types.GET_POSTS_SUCCESS,
    };
    const action = actions.getPostsSuccess(response);
    expect(action).toEqual(expectedAction);
  });


  it('creates an action to indicate getting posts failed', () => {
    const expectedAction = {
      type: types.GET_POSTS_ERROR,
    };
    const action = actions.getPostsError();
    expect(action).toEqual(expectedAction);
  });

  it('creates an action to set search data in the state and trigger a search', () => {
    const search = {
      searchString: 'foo',
      searchType: 'text',
    };
    const expectedAction = {
      type: types.SET_SEARCH,
      payload: search,
    };
    const action = actions.setSearch(search);
    expect(action).toEqual(expectedAction);
  });

  it('creates an action to update posts isSaved and mark all photos with that ID as saved, because in the response there may be duplicates', () => {
    const data = { flickrId: 42, isSaved: true };
    const expectedAction = {
      type: types.UPDATE_POSTS,
      payload: data,
    };
    const action = actions.updatePostsIsSaved(data);
    expect(action).toEqual(expectedAction);
  });

  it('creates an action to reset the state of the posts store', () => {
    const data = {};
    const expectedAction = {
      type: types.RESET_STATE,
    };
    const action = actions.reset(data);
    expect(action).toEqual(expectedAction);
  });
});
