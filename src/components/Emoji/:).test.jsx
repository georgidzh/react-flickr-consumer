import React from 'react';
import { shallow } from 'enzyme';
import Emoji from './Emoji';

describe(':) <Emoji />', () => {
  it('should display a sad emoji if the test fails', () => {
    const wrapper = shallow(<Emoji icon="😂" />);
    expect(wrapper.find(<span className="emoji" role="img" aria-hidden="true">🤔</span>)).toBeTruthy();
  });
});
