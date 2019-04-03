import {
  SET_IS_LOADING,
  GET_POSTS_SUCCESS,
  SET_SEARCH,
  RESET_STATE,
  UPDATE_POSTS,
  GET_POSTS_ERROR,
} from './action-types';
import { SEARCH_TYPE_TEXT } from '../../utils/constants';


export const initialState = {
  isLoading: false,
  posts: [],
  hasMorePosts: true,
  currentPage: 0,
  postsPerPage: 50,
  totalPosts: 0,
  searchString: '',
  searchType: SEARCH_TYPE_TEXT,
};

const getPostsSuccess = (state, payload) => {
  const {
    posts,
    totalPosts,
    page,
    hasMorePosts,
  } = payload;

  return {
    ...state,
    isLoading: false,
    posts: [...state.posts, ...posts],
    totalPosts,
    currentPage: page,
    hasMorePosts,
  };
};

const getPostsError = state => ({
  ...state,
  isLoading: false,
  hasMorePosts: false,
});

const updateIsSaved = (state, payload) => {
  const posts = state.posts.map((post) => {
    if (post.flickrId === payload.flickrId) {
      const newPost = { ...post };
      newPost.isSaved = payload.isSaved;
      return newPost;
    }
    return post;
  });

  return {
    ...state,
    posts,
  };
};

const setSearch = (state, searchData) => ({
  ...state,
  posts: [],
  hasMorePosts: true,
  currentPage: 0,
  totalPosts: 0,
  ...searchData,
});

const setIsLoading = (state, payload) => ({ ...state, isLoading: payload });

export const reducer = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case SET_IS_LOADING: return setIsLoading(state, payload);
    case GET_POSTS_SUCCESS: return getPostsSuccess(state, payload);
    case GET_POSTS_ERROR: return getPostsError(state);
    case SET_SEARCH: return setSearch(state, payload);
    case UPDATE_POSTS: return updateIsSaved(state, payload);
    case RESET_STATE: return initialState;
    default: return state;
  }
};

export default reducer;
