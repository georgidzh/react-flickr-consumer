import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { PostsContainer } from './PostsContainer';
import { dummyPost, getPosts } from '../../test-utils/dummy';

global.scrollTo = jest.fn();

let wrapper;

const defaultProps = {
  isLoadingPosts: false,
  service: 'rest',
  posts: [],
  currentPage: 0,
  totalPosts: 0,
  searchString: '',
  searchType: 'text',
  hasMorePosts: true,
  showPostsInfo: true,
  imageSize: 'small',
  detailsVisible: false,
  detailsData: null,

  getPostsHandler: jest.fn(),
  searchHandler: jest.fn(),
  savePostHandler: jest.fn(),
  unsavePostHandler: jest.fn(),
  showDetailsHandler: jest.fn(),
  hideDetailsHandler: jest.fn(),
  resetHandler: jest.fn(),
};

// afterEach(() => {
//   jest.clearAllMocks();
// });

describe('<PostsContainer /> renders:', () => {
  beforeEach(() => {
    wrapper = shallow((
      <PostsContainer {...defaultProps} />
    ));
  });
  it('should render self', () => {
    expect(wrapper.find('.posts').length).toEqual(1);
  });

  it('should call scroll to top when mounted', () => {
    expect(global.scrollTo.mock.calls[0]).toEqual([0, 0]);
  });

  it('should not render a grid but a message if there are no posts to show', () => {
    wrapper.setProps({ hasMorePosts: false });
    expect(wrapper.find('.no-posts').length).toEqual(1);
    expect(wrapper.find('[data-test="grid"]').length).toEqual(0);
  });

  it('should render a grid and no message if there are posts', () => {
    wrapper.setProps({ posts: getPosts(42) });
    expect(wrapper.find('.no-posts').length).toEqual(0);
    expect(wrapper.find('[data-test="grid"]').length).toEqual(1);
    wrapper.setProps({ posts: [], hasMorePosts: true });
    expect(wrapper.find('.no-posts').length).toEqual(0);
    expect(wrapper.find('[data-test="grid"]').length).toEqual(1);
  });

  it('should not render the search if it is loading the first page, but should render the search after', () => {
    wrapper.setProps({ isLoadingPosts: true, currentPage: 0 });
    expect(wrapper.find('[data-test="search"]').length).toEqual(0);
    wrapper.setProps({ isLoadingPosts: true, currentPage: 1 });
    expect(wrapper.find('[data-test="search"]').length).toEqual(1);
    wrapper.setProps({ isLoadingPosts: false, currentPage: 1 });
    expect(wrapper.find('[data-test="search"]').length).toEqual(1);
  });

  it('should render the posts modal if the store data says so', () => {
    wrapper.setProps({ detailsVisible: true, detailsData: dummyPost });
    expect(wrapper.find('[data-test="post-modal"]').length).toEqual(1);
    wrapper.setProps({ detailsVisible: false });
    expect(wrapper.find('[data-test="post-modal"]').length).toEqual(0);
  });
});
