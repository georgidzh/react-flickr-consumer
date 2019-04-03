import React from 'react';
import { mount, render } from 'enzyme';
import sinon from 'sinon';
import Tag from './Tag';

describe('<Tag />', () => {
  it('should render the tag string', () => {
    const clickHandlerStub = sinon.spy();
    const tag = 'aTag';
    const wrapped = render(<Tag tag={tag} clickHandler={clickHandlerStub} />);
    expect(wrapped.text()).toContain(tag);
  });

  it('should call the click handler when clicked and send the tag', () => {
    const clickHandlerStub = sinon.spy();
    const tag = 'aTag';
    const wrapper = mount(<Tag tag={tag} clickHandler={clickHandlerStub} />);
    wrapper.find('span').simulate('click');
    // expect(clickHandlerStub).toHaveProperty('callCount', 1);
    expect(clickHandlerStub.calledOnceWith({
      searchString: tag,
      searchType: 'tags',
    })).toBe(true);
  });
});
