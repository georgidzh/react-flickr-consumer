import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import PostsContainer from '../_containers/PostsContainer';
import { REST_SERVICE } from '../../utils/constants';

export default function ResentRoute() {
  return <PostsContainer data-test="recent-page" service={REST_SERVICE} />;
}
