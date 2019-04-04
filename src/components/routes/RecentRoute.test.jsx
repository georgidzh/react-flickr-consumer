import React from 'react';
import { shallow } from 'enzyme';
import RecentRoute from './RecentRoute';

describe('<RecentRoute />', () => {
  it('should render the page for the recent flickr posts', () => {
    const wrapper = shallow(<RecentRoute />);
    expect(wrapper.find('[data-test="recent-page"]').length).toEqual(1);
  });
});
