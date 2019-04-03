import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PostsContainer from './PostsContainer';
import Root from '../../Root';
import { REST_SERVICE, SEARCH_TYPE_TEXT } from '../../utils/constants';

let wrapper;
let service = REST_SERVICE;

global.scrollTo = jest.fn();

beforeEach(() => {
  const initialState = {
    posts: {
      isLoading: false,
      posts: [],
      hasMorePosts: true,
      currentPage: 0,
      postsPerPage: 50,
      totalPosts: 0,
      searchString: '',
      searchType: SEARCH_TYPE_TEXT,
    },
    ui: {
      isInitialized: false,
      indexedDbSupported: true,
      savedPostsCount: 0,
      detailsModalVisible: false,
      detailsModalPostData: null,
      errorModalVisible: false,
      errorModalData: null,
      showPostsInfo: true,
      imageSize: 'small',
    },
  };
  wrapper = mount((
    <Root initialState={initialState}>
      <PostsContainer service={service} />
    </Root>
  ));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('<PostsContainer />', () => {
  it('renders the posts container', () => {
    expect(wrapper.find('div.flickr-feed-page').length).toEqual(1);
  });

  it('calls window.scrollTo when route changes', () => {
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('it calls loadMorePosts', () => {
    const loadMoreSpy = sinon.spy(PostsContainer.prototype, 'loadMorePosts');
    expect(loadMoreSpy).toHaveBeenCalled();

    // const callback = sinon.fake();
    // loadMoreSpy(42, callback);

    // This is part of the FakeXMLHttpRequest API
    // server.requests[0].respond(
        // 200,
        // { "Content-Type": "application/json" },
        // JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
    // );

    // assert(callback.calledOnce);;
  });
});