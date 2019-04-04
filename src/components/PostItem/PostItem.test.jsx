import React from 'react';
import { shallow } from 'enzyme';
import { PostItem } from './PostItem';
import { dummyPost } from '../../test-utils/dummy';

let wrapper;

const defaultProps = {
  post: dummyPost,
  isSaved: false,
  showPostsInfo: true,
  imageSuffix: 'small',
  showDetails: jest.fn(),
  save: jest.fn(),
  unsave: jest.fn(),
  searchHandler: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('<PostItem />', () => {
  beforeEach(() => {
    wrapper = shallow((
      <PostItem {...defaultProps} />
    ));
  });

  it('renders self and it\'s components', () => {
    expect(wrapper.find('.post-card').length).toEqual(1);
    expect(wrapper.find('[data-test="post-image"]').length).toEqual(1);
    expect(wrapper.find('[data-test="post-title"]').length).toEqual(1);
    expect(wrapper.find('[data-test="post-description"]').length).toEqual(1);
    expect(wrapper.find('[data-test="post-tags-limited"]').length).toEqual(1);
  });

  it('doesn\'t render the card-body if the setting is set to not show it', () => {
    wrapper.setProps({ showPostsInfo: false });
    expect(wrapper.find('.post-card').length).toEqual(1);
    expect(wrapper.find('[data-test="post-image"]').length).toEqual(1);
    expect(wrapper.find('[data-test="post-title"]').length).toEqual(0);
    expect(wrapper.find('.card-body').length).toEqual(0);
    expect(wrapper.find('[data-test="post-description"]').length).toEqual(0);
    expect(wrapper.find('[data-test="post-tags-limited"]').length).toEqual(0);
  });

  it('should show the save button if the post is not saved and triggers the action to save the post by clicking it', () => {
    expect(defaultProps.save.mock.calls.length).toBe(0);
    const saveBtn = wrapper.find('button.save');
    expect(saveBtn.length).toEqual(1);
    saveBtn.simulate('click');
    expect(defaultProps.save.mock.calls.length).toBe(1);
  });

  it('should show the unsave button if the post is saved and triggers the action to unsave the post by clicking it', () => {
    wrapper.setProps({ isSaved: true });
    expect(defaultProps.unsave.mock.calls.length).toBe(0);
    const unsaveBtn = wrapper.find('button.unsave');
    expect(unsaveBtn.length).toEqual(1);
    unsaveBtn.simulate('click');
    expect(defaultProps.unsave.mock.calls.length).toBe(1);
  });
});
