import React from 'react';
import { shallow } from 'enzyme';
import SavedRoute from './SavedRoute';

describe('<SavedRoute />', () => {
  it('should render the page for the recent flickr posts', () => {
    const wrapper = shallow(<SavedRoute />);
    expect(wrapper.find('[data-test="saved-page"]').length).toEqual(1);
  });
});
