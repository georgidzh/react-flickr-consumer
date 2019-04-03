import React from 'react';
import PostsContainer from '../_containers/PostsContainer';
import { STORAGE_SERVICE } from '../../utils/constants';

export default function SavedRoute() {
  return <PostsContainer service={STORAGE_SERVICE} />;
}
