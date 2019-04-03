// POSTS
export const REST_SERVICE = 'rest';
export const STORAGE_SERVICE = 'storage';
export const SEARCH_TYPE_TEXT = 'text';
export const SEARCH_TYPE_TAGS = 'tags';

export const locationForServiceMap = {
  [REST_SERVICE]: '/recent',
  [STORAGE_SERVICE]: '/saved',
};

// Settings
export const IMAGE_SIZE_KEY = 'imageSize';
export const IMAGE_SMALL = 'small';
export const IMAGE_SQUARE = 'square';
export const SHOW_POSTS_INFO = 'showPostsInfo';

export const appSettings = {
  imageSize: {
    key: IMAGE_SIZE_KEY,
    defaultValue: 'small',
  },
  showPostsInfo: {
    key: SHOW_POSTS_INFO,
    defaultValue: true,
  },
};
