/* eslint-disable no-plusplus */
import { getPosts } from './dummy';
import { setLoading, getPostsSuccess, getPostsError } from '../store/posts/actions';
import { showErrorModal } from '../store/ui/actions';


export const responseSuccess = {
  posts: getPosts(1),
  totalPosts: 1,
  hasMorePosts: true,
  page: 1,
};

export const responseError = 'Error getting posts';

const getFakeSuccess = async () => {
  const data = await responseSuccess;
  return data;
};
const getFakeFail = () => setTimeout(() => Error('error'));

export default (success = true) => (dispatch) => {
  if (success) {
    return getFakeSuccess()
      .then((data) => {
        dispatch(setLoading(false));
        dispatch(getPostsSuccess(data));
      });
  }

  if (!success) {
    return getFakeFail()
      .then(() => {
        dispatch(getPostsError());
        dispatch(showErrorModal({
          message: 'Something went wrong while getting posts. Try later...',
        }));
      });
  }
  return false;
};
