import React from 'react';
import { shallow } from 'enzyme';
import LazyImage from './Image';

const imageUrl = 'https://via.placeholder.com/150';

describe('<LazyImage />', () => {
  it('should render an image with the provided src in prop data-src', () => {
    const wrapper = shallow(<LazyImage src={imageUrl} />);
    expect(wrapper.find('img').prop('data-src')).toEqual(imageUrl);
  });
});
