import React from 'react';
import { shallow } from 'enzyme';
import PostsCounter from './PostsCounter';

const defaultProps = {
  total: 45,
  showing: 20,
};

describe('<PostsCounter />', () => {
  it('should display the given products count', () => {
    const wrapper = shallow(<PostsCounter {...defaultProps} />);
    const expected = (
      <span className="pr-2 posts-counter text-white-50">
        20 from 45 photos
      </span>
    );
    expect(wrapper.find(expected)).toBeTruthy();
  });
});
