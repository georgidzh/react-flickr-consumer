import React from 'react';
import PostsContainer from '../_containers/PostsContainer';
import { REST_SERVICE } from '../../utils/constants';

export default function ResentRoute() {
  return <PostsContainer service={REST_SERVICE} />;
}
