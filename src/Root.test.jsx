import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root';

describe('<Root />', () => {
  it('renders children when passed in', () => {
    const wrapper = shallow((
      <Root>
        <div className="some" />
      </Root>
    ));
    expect(wrapper.contains(<div className="some" />)).toEqual(true);
  });
});
