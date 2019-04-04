import React from 'react';
import { shallow, mount } from 'enzyme';
// import sinon from 'sinon';
import { AppNavbar } from './AppNavbar';
import Root from '../../Root';
import { CONFIRM_MSG_RESIZE_IMAGES, CONFIRM_MSG_DELETE_POSTS } from '../../utils/constants';

let wrapper;

const defaultProps = {
  totalPosts: 0,
  showing: 0,
  locationPath: '/recent',
  showPostsInfo: true,
  imageSize: 'small',
  savedPostsCount: 42,
  togglePostsInfoHandler: jest.fn(),
  toggleImageSizeHandler: jest.fn(),
  deletePostsHandler: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
  wrapper = null;
});

describe('<AppNavbar />', () => {
  beforeEach(() => {
    wrapper = shallow((
      <AppNavbar {...defaultProps} />
    ));
  });
  it('renders self', () => {
    expect(wrapper.find('.app-navbar').length).toEqual(1);
  });

  it('renders the badge with the correct saved posts count', () => {
    // eslint-disable-next-line prefer-template
    expect(wrapper.find('.saved-count').text()).toEqual(defaultProps.savedPostsCount + '');
  });

  it('renders the toggle posts info button calls togglePostsInfoHandler when the toggle nav link is clicked', () => {
    // eslint-disable-next-line prefer-template
    expect(wrapper.find('.toggle-info-btn').length).toEqual(1);
    wrapper.find('.toggle-info-btn').simulate('click');
    expect(defaultProps.togglePostsInfoHandler.mock.calls.length).toBe(1);
  });

  it('renders posts counter if there are posts', () => {
    expect(wrapper.find('[data-test="posts-counter"]').length).toEqual(0);
    wrapper.setProps({ totalPosts: 234, showing: 42 });
    expect(wrapper.find('[data-test="posts-counter"]').length).toEqual(1);
  });
});

describe('<AppNavbar /> confirmations:', () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <AppNavbar {...defaultProps} />
      </Root>,
    );
  });

  it(`doesn't contain confirmation dialog open but on click of the resize button opens it with the correct confirm message
      and on click of the cancel button doesn't trigger the resize handler and closes the dialog`, () => {
    expect(wrapper.find('div.confirm-resize-dialog').length).toEqual(0);
    wrapper.find('a.toggle-image-size-btn').simulate('click');
    expect(wrapper.find('div.confirm-resize-dialog').length).toEqual(1);
    expect(wrapper.find('div.modal-body').text()).toContain(CONFIRM_MSG_RESIZE_IMAGES);
    const cancelButton = wrapper.find('button.cancel-confirm-resize-btn');
    expect(cancelButton.length).toBe(1);
    cancelButton.simulate('click');
    expect(defaultProps.toggleImageSizeHandler.mock.calls.length).toBe(0);
    expect(wrapper.find('div.confirm-resize-dialog').length).toEqual(0);
  });

  it('reacts to the resize confirmation and the resize handler is called', () => {
    wrapper.find('a.toggle-image-size-btn').simulate('click');
    const confirmButton = wrapper.find('button.confirm-resize-btn');
    expect(confirmButton.length).toBe(1);
    confirmButton.simulate('click');
    expect(defaultProps.toggleImageSizeHandler.mock.calls.length).toBe(1);
    expect(wrapper.find('div.confirm-resize-dialog').length).toEqual(0);
  });

  it(`doesn't contain confirmation dialog open but on click of the delete saved posts button opens it with the correct confirm message
      and on click of the cancel button doesn't trigger the delete handler and closes the dialog, the button`, () => {
    expect(wrapper.find('div.confirm-unsave-dialog').length).toEqual(0);
    wrapper.find('a.delete-posts-btn').simulate('click');
    expect(wrapper.find('div.confirm-unsave-dialog').length).toEqual(1);
    expect(wrapper.find('div.modal-body').text()).toContain(CONFIRM_MSG_DELETE_POSTS);
    const cancelButton = wrapper.find('button.cancel-confirm-unsave-btn');
    expect(cancelButton.length).toBe(1);
    cancelButton.simulate('click');
    expect(defaultProps.deletePostsHandler.mock.calls.length).toBe(0);
    expect(wrapper.find('div.confirm-unsave-dialog').length).toEqual(0);
  });


  it('disables the delete cancel button if the stored posts are 0 and the confirm is not opening by clicking it', () => {
    wrapper.setProps({ savedPostsCount: 0 });
    wrapper.find('a.delete-posts-btn').simulate('click');
    expect(wrapper.find('div.confirm-resize-dialog').length).toEqual(0);
    const confirmButton = wrapper.find('button.confirm-unsave-dialog');
    expect(confirmButton.length).toBe(0);
    expect(defaultProps.deletePostsHandler.mock.calls.length).toBe(0);
  });

  it('reacts to the delete posts confirmation and the delete handler is called', () => {
    wrapper.find('a.delete-posts-btn').simulate('click');
    const confirmButton = wrapper.find('button.confirm-unsave-btn');
    expect(confirmButton.length).toBe(1);
    confirmButton.simulate('click');
    expect(defaultProps.deletePostsHandler.mock.calls.length).toBe(1);
    expect(wrapper.find('div.confirm-delete-dialog').length).toEqual(0);
  });
});
