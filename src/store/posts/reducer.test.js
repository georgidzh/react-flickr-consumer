import { reducer, initialState } from './reducer';
import {
  SET_IS_LOADING,
  GET_POSTS_SUCCESS,
  SET_SEARCH,
  RESET_STATE,
  UPDATE_POSTS,
  GET_POSTS_ERROR,
} from './action-types';

describe('Posts reducer', () => {
  it('sets the initial state', () => {
    const state = reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  it('sets is loading', () => {
    const action = {
      type: SET_IS_LOADING,
      payload: true,
    };
    const newState = reducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('handles actions with unknown type', () => {
    const newState = reducer([], { type: 'Unknown', payload: 'Yes' });
    expect(newState).toEqual([]);
  });

  it('it sets posts on success', () => {
    const state = {
      isLoading: true,
      posts: [{ 1: 1 }],
      someProp: 'some',
      totalPosts: 50,
      currentPage: 1,
      hasMorePosts: true,
    };
    const action = {
      type: GET_POSTS_SUCCESS,
      payload: {
        posts: [{ 2: 2 }, { 3: 3 }],
        totalPosts: 100,
        page: 2,
        hasMorePosts: false,
      },
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      isLoading: false,
      someProp: 'some',
      posts: [{ 1: 1 }, { 2: 2 }, { 3: 3 }],
      totalPosts: 100,
      currentPage: 2,
      hasMorePosts: false,
    });
  });

  it('it sets posts no more pages on error when getting data to prevent loading more', () => {
    const state = {
      isLoading: true,
      posts: [{ 1: 1 }],
      someProp: 'some',
      totalPosts: 50,
      currentPage: 1,
      hasMorePosts: true,
    };
    const action = {
      type: GET_POSTS_ERROR,
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      isLoading: false,
      posts: [{ 1: 1 }],
      someProp: 'some',
      totalPosts: 50,
      currentPage: 1,
      hasMorePosts: false,
    });
  });

  it('it updates a post is saved', () => {
    const state = {
      posts: [
        { flickrId: 1, isSaved: false },
        { flickrId: 2, isSaved: false },
      ],
      someProp: 'some',
    };
    const action = {
      type: UPDATE_POSTS,
      payload: { flickrId: 2, isSaved: true },
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      posts: [
        { flickrId: 1, isSaved: false },
        { flickrId: 2, isSaved: true },
      ],
      someProp: 'some',
    });
  });

  it('it does nothing if the post is not in the state', () => {
    const state = {
      posts: [
        { flickrId: 1, isSaved: false },
        { flickrId: 2, isSaved: false },
      ],
      someProp: 'some',
    };
    const action = {
      type: UPDATE_POSTS,
      payload: { flickrId: 3, isSaved: true },
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      posts: [
        { flickrId: 1, isSaved: false },
        { flickrId: 2, isSaved: false },
      ],
      someProp: 'some',
    });
  });

  it('sets search string and resets pages to activate component loading', () => {
    const state = {
      posts: [{ flickrId: 1, isSaved: false }],
      hasMorePosts: false,
      currentPage: 5,
      totalPosts: 155,
      searchString: '',
      searchType: 'text',
      someProp: 'some',
    };
    const action = {
      type: SET_SEARCH,
      payload: { searchString: 'search', searchType: 'tags' },
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      posts: [],
      hasMorePosts: true,
      currentPage: 0,
      totalPosts: 0,
      searchString: 'search',
      searchType: 'tags',
      someProp: 'some',
    });
  });

  it('resets the state', () => {
    reducer(initialState, {});
    const state = {
      isLoading: true,
      posts: [{ flickrId: 1, isSaved: false }],
      hasMorePosts: false,
      currentPage: 155,
      postsPerPage: 60,
      totalPosts: 12312,
      searchString: 'dadada',
      searchType: 'tags',
    };
    reducer(state, {});
    const newState = reducer(state, { type: RESET_STATE });
    expect(newState).toEqual(initialState);
  });
});
