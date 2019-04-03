/* eslint-disable no-console */
import {
  SET_IS_INITIALIZED,
  SET_INDEXED_DB_SUPPORTED,
  SET_USER_SETTINGS,
  POST_MODAL_SHOW,
  POST_MODAL_HIDE,
  SET_SAVED_POSTS_COUNT,
  ERROR_MODAL_SHOW,
  ERROR_MODAL_HIDE,
  SET_SERVICE,
} from './action-types';
import PostsStorage from '../../services/storage/PostsStorage';
import SettingsStorage from '../../services/storage/SettingsStorage';
import { appSettings, IMAGE_SMALL, IMAGE_SQUARE } from '../../utils/constants';
import { findOrCreateAsyncSetting } from '../../utils/helpers';

export const setIsInitialized = val => ({ type: SET_IS_INITIALIZED, payload: val });
export const setIndexedDbSupported = val => ({ type: SET_INDEXED_DB_SUPPORTED, payload: val });
export const setSavedPostsCount = count => ({ type: SET_SAVED_POSTS_COUNT, payload: count });

export const showPostModal = payload => ({ type: POST_MODAL_SHOW, payload });
export const hidePostModal = () => ({ type: POST_MODAL_HIDE });

export const showErrorModal = payload => ({ type: ERROR_MODAL_SHOW, payload });
export const hideErrorModal = () => ({ type: ERROR_MODAL_HIDE });

export const setSettings = payload => ({ type: SET_USER_SETTINGS, payload });
export const setService = payload => ({ type: SET_SERVICE, payload });

export const togglePostsInfo = () => (dispatch, getState) => {
  const setting = {
    key: appSettings.showPostsInfo.key,
    value: !getState().ui.showPostsInfo,
  };
  SettingsStorage.put(setting)
    .then(() => dispatch(setSettings([setting])));
};

export const toggleImageSize = () => (dispatch, getState) => {
  const setting = {
    key: appSettings.imageSize.key,
    value: getState().ui.imageSize === IMAGE_SMALL ? IMAGE_SQUARE : IMAGE_SMALL,
  };
  SettingsStorage.put(setting)
    .then(() => dispatch(setSettings([setting])));
};

export const incrementSavedPostsCount = () => (dispatch, getState) => {
  const newCount = getState().ui.savedPostsCount + 1;
  dispatch(setSavedPostsCount(newCount));
};

export const decrementSavedPostsCount = () => (dispatch, getState) => {
  const newCount = getState().ui.savedPostsCount - 1;
  dispatch(setSavedPostsCount(newCount));
};

export const initialize = () => async (dispatch) => {
  // eslint-disable-next-line no-undef
  if (!window.indexedDB) {
    console.info('Your browser doesn\'t support IndexedDB. If you want to use all features upgrade your browser');
    dispatch(setIndexedDbSupported(false));
  } else {
    dispatch(setIndexedDbSupported(true));
    const postsCount = await PostsStorage.countAll();
    dispatch(setSavedPostsCount(postsCount));
    const settings = await findOrCreateAsyncSetting(appSettings);
    dispatch(setSettings(settings));
    dispatch(setIsInitialized(true));
  }
};
