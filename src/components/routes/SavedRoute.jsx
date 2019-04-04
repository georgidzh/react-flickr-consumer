import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import PostsContainer from '../_containers/PostsContainer';
import { STORAGE_SERVICE } from '../../utils/constants';

export default function SavedRoute() {
  return <PostsContainer data-test="saved-page" service={STORAGE_SERVICE} />;
}
