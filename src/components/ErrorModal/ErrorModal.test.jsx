import React from 'react';
import { shallow } from 'enzyme';
import ErrorModal from './ErrorModal';

const defaultProps = {
  isOpen: true,
  errorMessage: 'Your tests failed! Again!',
  closeHandler: jest.fn(),
};

describe('<ErrorModal />', () => {
  it('display the given error message', () => {
    const wrapper = shallow(<ErrorModal {...defaultProps} />);
    expect(wrapper.find('p').text()).toBe(defaultProps.errorMessage);
  });
});
