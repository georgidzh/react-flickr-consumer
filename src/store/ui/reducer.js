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
import { appSettings } from '../../utils/constants';
import { keyObjects } from '../../utils/helpers';

const defaultSettings = keyObjects(Object.values(appSettings), 'key', 'defaultValue');

export const initialState = {
  isInitialized: false,
  indexedDbSupported: true,
  savedPostsCount: 0,
  detailsModalVisible: false,
  detailsModalPostData: null,
  errorModalVisible: false,
  errorModalData: null,
  ...defaultSettings,
};

const setUserSettings = (state, payload) => {
  const settings = keyObjects(payload, 'key', 'value');
  return {
    ...state,
    ...settings,
  };
};

const showPostModal = (state, payload) => ({
  ...state,
  detailsModalPostData: payload,
  detailsModalVisible: true,
});

const hidePostModal = state => ({
  ...state,
  detailsModalPostData: null,
  detailsModalVisible: false,
});

const showErrorModal = (state, payload) => ({
  ...state,
  errorModalData: payload,
  errorModalVisible: true,
});

const hideErrorModal = state => ({
  ...state,
  errorModalData: null,
  errorModalVisible: false,
});

export const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case SET_IS_INITIALIZED: return { ...state, isInitialized: payload };
    case SET_INDEXED_DB_SUPPORTED: return { ...state, indexedDbSupported: payload };
    case SET_SAVED_POSTS_COUNT: return { ...state, savedPostsCount: payload };
    case SET_USER_SETTINGS: return setUserSettings(state, payload);
    case POST_MODAL_SHOW: return showPostModal(state, payload);
    case POST_MODAL_HIDE: return hidePostModal(state);
    case ERROR_MODAL_SHOW: return showErrorModal(state, payload);
    case ERROR_MODAL_HIDE: return hideErrorModal(state);
    default: return state;
  }
};

export default reducer;
