import { reducer } from './reducer';
import {
  SET_IS_INITIALIZED,
  SET_INDEXED_DB_SUPPORTED,
  SET_SAVED_POSTS_COUNT,
  SET_USER_SETTINGS,
  POST_MODAL_SHOW,
  POST_MODAL_HIDE,
  ERROR_MODAL_SHOW,
  ERROR_MODAL_HIDE,
} from './action-types';

const initialTestState = {
  isInitialized: false,
  indexedDbSupported: true,
  savedPostsCount: 0,
  detailsModalVisible: false,
  detailsModalPostData: null,
  errorModalVisible: false,
  errorModalData: null,
  showPostsInfo: true,
  imageSize: 'small',
};

describe('ui reducer', () => {
  it('sets the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialTestState);
  });

  it('indicates in state that the app is initialized', () => {
    const action = {
      type: SET_IS_INITIALIZED,
      payload: true,
    };
    const state = reducer(initialTestState, action);
    expect(state).toEqual({
      isInitialized: true,
      indexedDbSupported: true,
      savedPostsCount: 0,
      detailsModalVisible: false,
      detailsModalPostData: null,
      errorModalVisible: false,
      errorModalData: null,
      showPostsInfo: true,
      imageSize: 'small',
    });
  });

  it('indicates in state that the browser does not support indexed db', () => {
    const action = {
      type: SET_INDEXED_DB_SUPPORTED,
      payload: false,
    };
    const state = reducer(initialTestState, action);
    expect(state).toEqual({
      isInitialized: false,
      indexedDbSupported: false,
      savedPostsCount: 0,
      detailsModalVisible: false,
      detailsModalPostData: null,
      errorModalVisible: false,
      errorModalData: null,
      showPostsInfo: true,
      imageSize: 'small',
    });
  });

  it('sets saved posts count in state', () => {
    const action = {
      type: SET_SAVED_POSTS_COUNT,
      payload: 42,
    };
    const state = reducer(initialTestState, action);
    expect(state).toEqual({
      isInitialized: false,
      indexedDbSupported: true,
      savedPostsCount: 42,
      detailsModalVisible: false,
      detailsModalPostData: null,
      errorModalVisible: false,
      errorModalData: null,
      showPostsInfo: true,
      imageSize: 'small',
    });
  });

  it('sets a user settings dynamically from object/s in array', () => {
    const initial = {
      showPostsInfo: true,
      imageSize: 'small',
    };
    const setting1 = {
      key: 'imageSize',
      value: 'square',
    };
    let state = reducer(initial, { type: SET_USER_SETTINGS, payload: [setting1] });
    expect(state).toEqual({
      showPostsInfo: true,
      imageSize: 'square',
    });
    const setting2 = {
      key: 'showPostsInfo',
      value: false,
    };
    state = reducer(initial, { type: SET_USER_SETTINGS, payload: [setting2] });
    expect(state).toEqual({
      showPostsInfo: false,
      imageSize: 'small',
    });
    state = reducer(initial, { type: SET_USER_SETTINGS, payload: [setting1, setting2] });
    expect(state).toEqual({
      showPostsInfo: false,
      imageSize: 'square',
    });
  });

  it('set state to show the post modal with post details data', () => {
    const initial = {
      some: 'some',
      detailsModalPostData: null,
      detailsModalVisible: false,
    };
    const action = {
      type: POST_MODAL_SHOW,
      payload: { some: 'some2' },
    };
    const state = reducer(initial, action);
    expect(state).toEqual({
      some: 'some',
      detailsModalPostData: { some: 'some2' },
      detailsModalVisible: true,
    });
  });

  it('sets state to hide the post modal and clears details data', () => {
    const initial = {
      some: 'some',
      detailsModalPostData: { some: 'some2' },
      detailsModalVisible: true,
    };
    const action = { type: POST_MODAL_HIDE };
    const state = reducer(initial, action);
    expect(state).toEqual({
      some: 'some',
      detailsModalPostData: null,
      detailsModalVisible: false,
    });
  });

  it('sets state to show error modal ', () => {
    const initial = {
      some: 'some',
      errorModalData: null,
      errorModalVisible: false,
    };
    const action = {
      type: ERROR_MODAL_SHOW,
      payload: { message: 'Something went wrong while getting posts. Try later...' },
    };
    const state = reducer(initial, action);
    expect(state).toEqual({
      some: 'some',
      errorModalData: action.payload,
      errorModalVisible: true,
    });
  });

  it('sets state to hide the error modal ', () => {
    const initial = {
      some: 'some',
      errorModalData: { message: 'Something went wrong while getting posts. Try later...' },
      errorModalVisible: true,
    };
    const action = {
      type: ERROR_MODAL_HIDE,
    };
    const state = reducer(initial, action);
    expect(state).toEqual({
      some: 'some',
      errorModalData: null,
      errorModalVisible: false,
    });
  });
});
