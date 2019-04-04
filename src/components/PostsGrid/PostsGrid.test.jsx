import React from 'react';
import { shallow } from 'enzyme';
import PostGrid from './PostsGrid';
import { getPosts } from '../../test-utils/dummy';

let wrapper;

const defaultProps = {
  imageSuffix: 'small',
  hasMorePosts: true,
  posts: getPosts(40),
  showPostsInfo: true,
  loadMore: jest.fn(),
  savePost: jest.fn(),
  unsavePost: jest.fn(),
  showDetails: jest.fn(),
  searchHandler: jest.fn(),
};

describe('<PostGrid />', () => {
  it('renders self', () => {
    wrapper = shallow(<PostGrid {...defaultProps} />);
    expect(wrapper.find('.grid').length).toEqual(1);
  });

  it('renders all posts', () => {
    wrapper = shallow(<PostGrid {...defaultProps} />);
    expect(wrapper.find('[data-test="post-item"]').length).toEqual(defaultProps.posts.length);
  });
});
