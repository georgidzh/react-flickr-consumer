import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import PostModal from './PostModal';
import { dummyPost } from '../../test-utils/dummy';

const defaultProps = {
  isVisible: true,
  post: dummyPost,
  hide: jest.fn(),
  searchHandler: jest.fn(),
};
describe('<PostModal />', () => {
  it('renders self and the information for the post', () => {
    const wrapper = shallow(<PostModal {...defaultProps} />);
    expect(wrapper.find('.post-title').text()).toEqual(`Title:${defaultProps.post.title}`);
    wrapper.setProps({
      post: {
        ...defaultProps.post,
        title: '',
      },
    });
    expect(wrapper.find('.post-title').text()).toEqual('Title:No Title');
    expect(wrapper.find(`a[href="${defaultProps.post.link}"]`).length).toEqual(1);
    expect(wrapper.find(`a[href="${defaultProps.post.authorLink}"]`).length).toEqual(1);
    expect(wrapper.find(`a[href="${defaultProps.post.authorLink}"]`).text()).toEqual(defaultProps.post.author);
    expect(wrapper.find('.published-at').text()).toEqual(moment.unix(defaultProps.post.publishedAt).format('dddd, MMMM Do YYYY, h:mm:ss a'));
    wrapper.setProps({
      post: {
        ...defaultProps.post,
        createdAt: undefined,
      },
    });
    expect(wrapper.find('.created-at').length).toEqual(0);
    const now = moment().unix();
    wrapper.setProps({
      post: {
        ...defaultProps.post,
        createdAt: now,
      },
    });
    expect(wrapper.find('.created-at').length).toEqual(1);
    expect(wrapper.find('.created-at').text()).toEqual(moment.unix(now).format('dddd, MMMM Do YYYY, h:mm:ss a'));
  });
});
