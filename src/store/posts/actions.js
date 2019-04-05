import {
  SET_IS_LOADING,
  RESET_STATE,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POSTS,
  SET_SEARCH,
} from './action-types';

import PostsStorage from '../../services/storage/PostsStorage';
import FlickrRestService from '../../services/rest/FlickrRestService';

import {
  incrementSavedPostsCount,
  decrementSavedPostsCount,
  setSavedPostsCount,
  showErrorModal,
} from '../ui/actions';
import { locationForServiceMap } from '../../utils/constants';

export const setLoading = payload => ({ type: SET_IS_LOADING, payload });
export const getPostsSuccess = payload => ({ type: GET_POSTS_SUCCESS, payload });
export const getPostsError = () => ({ type: GET_POSTS_ERROR });
export const setSearch = payload => ({ type: SET_SEARCH, payload });
export const updatePostsIsSaved = payload => ({ type: UPDATE_POSTS, payload });
export const reset = () => ({ type: RESET_STATE });

export const savePost = post => dispatch => PostsStorage.save(post)
  .then(() => {
    dispatch(updatePostsIsSaved({ flickrId: post.flickrId, isSaved: true }));
    dispatch(incrementSavedPostsCount());
  })
  .catch((error) => {
    if (error.name !== 'ConstraintError') {
      dispatch(showErrorModal({
        message: 'Something went wrong while saving post. Sorry :(',
      }));
    }
  });

export const unsavePost = post => dispatch => PostsStorage.delete(post)
  .then(() => {
    dispatch(updatePostsIsSaved({ flickrId: post.flickrId, isSaved: false }));
    dispatch(decrementSavedPostsCount());
  })
  .catch(() => {
    dispatch(showErrorModal({
      message: 'Oppps, We did not delete the post for some reason...',
    }));
  });


const getHandler = (service) => {
  switch (service) {
    case 'storage':
      return PostsStorage;
    case 'rest':
      if (!document.FlickrRestService) {
        document.FlickrRestService = new FlickrRestService();
      }
      return document.FlickrRestService;
    default: return false;
  }
};

export const getPosts = service => (dispatch, getState) => (
  new Promise((resolve, reject) => {
    if (getState().posts.isLoading) return resolve('busy');
    dispatch(setLoading(true));
    const handler = getHandler(service);
    if (!handler) reject(Error('no_handler_found'));
    return handler.getPaginated(getState().posts)
      .then((data) => {
        const location = getState().router.location.pathname;
        // TODO:  in the future implement CancellationTokenSource.js. it will be better
        if (location !== locationForServiceMap[service]) {
          // console.info('service changed. rejecting data');
          resolve('service_changed');
        } else {
          dispatch(getPostsSuccess(data));
          resolve('ok');
        }
      })
      .catch((error) => {
        dispatch(getPostsError());
        // eslint-disable-next-line no-console
        console.log(error);
        dispatch(showErrorModal({
          message: 'Something went wrong while getting posts. Try later...',
        }));
        resolve('error');
      });
  })
);

export const deleteAllPosts = () => (dispatch, getState) => {
  if (getState().posts.isLoading) return;
  dispatch(setLoading(true));
  PostsStorage.deleteAll()
    .then(() => {
      dispatch(setLoading(false));
      dispatch(setSavedPostsCount(0));
      dispatch(reset());
    })
    .catch(() => {
      dispatch(showErrorModal({
        message: 'Something went terribly wrong while deleting your data. You can do it from the browse also btw. Sorry...',
      }));
      dispatch(setLoading(false));
    });
};
