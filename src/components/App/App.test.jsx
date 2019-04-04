import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import { App } from './App';

let wrapper;

const defaultProps = {
  isInitialized: false,
  errorModalVisible: false,
  errorModalData: null,

  initialize: jest.fn(),
  closeErrorModalHandler: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('<App />', () => {
  beforeEach(() => {
    wrapper = shallow((
      <App {...defaultProps} />
    ));
  });
  it('should render loading screen if is not initialized and calls initialize action', () => {
    expect(wrapper.find('.loading-screen').length).toEqual(1);
    expect(wrapper.find('.app').length).toEqual(0);
    expect(defaultProps.initialize.mock.calls.length).toBe(1);
  });

  it('should render self and not a loading screen if is initialized', () => {
    wrapper.setProps({ isInitialized: true });
    expect(wrapper.find('.loading-screen').length).toEqual(0);
    expect(wrapper.find('.app').length).toEqual(1);
  });

  it('renders the app navbar and app routes', () => {
    wrapper.setProps({ isInitialized: true });
    expect(wrapper.find('[data-test="app-navbar"]').length).toEqual(1);
    expect(wrapper.find('[data-test="app-routes"]').length).toEqual(1);
  });

  it('renders error modal if there is error passed by the store', () => {
    wrapper.setProps({
      isInitialized: true,
      errorModalVisible: true,
      errorModalData: { message: 'ouch' },
    });
    expect(wrapper.find('[data-test="app-navbar"]').length).toEqual(1);
    expect(wrapper.find('[data-test="app-routes"]').length).toEqual(1);
    expect(wrapper.find('[data-test="error-modal"]').length).toEqual(1);
  });
});
