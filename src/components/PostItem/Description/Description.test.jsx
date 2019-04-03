import React from 'react';
import { render } from 'enzyme';
import Description from './Description';

describe('<Description />', () => {
  it('should contain a short description', () => {
    const description = 'Some description';
    const wrapper = render(<Description description={description} />);
    expect(wrapper.text()).toContain(description);
  });
});
