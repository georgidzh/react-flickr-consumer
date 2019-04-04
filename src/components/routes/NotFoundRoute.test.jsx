import React from 'react';
import { shallow } from 'enzyme';
import NotFoundRoute from './NotFoundRoute';

describe('<NotFoundRoute />', () => {
  it('should display a message that the page is not found', () => {
    const wrapper = shallow(<NotFoundRoute />);
    expect(wrapper.find('h3').text()).toBe('The Page you are looking for does not exist');
  });
});
