import { REST_SERVICE, STORAGE_SERVICE } from './constants';

export const search = {
  placeholder: {
    [REST_SERVICE]: 'Search Flickr in title, tags and description',
    [STORAGE_SERVICE]: 'Search saved posts in title and tags',
  },
  defaultResult: {
    [REST_SERVICE]: 'Most recent posts on Flickr',
    [STORAGE_SERVICE]: 'Most recently saved',
  },
};

export default {
};
