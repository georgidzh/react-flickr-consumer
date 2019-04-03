import React from 'react';
import { render } from 'enzyme';
import sinon from 'sinon';
import Tags from './Tags';

describe('<Tags />', () => {
  it('should render text if the tags array is empty', () => {
    const clickHandlerStub = sinon.spy();
    const tags = [];
    const wrapped = render(<Tags tags={tags} searchHandler={clickHandlerStub} />);
    expect(wrapped.text()).toContain('Not provided');
  });

  it('should render all tags', () => {
    const clickHandlerStub = sinon.spy();
    const tags = ['one', 'two', 'three'];
    const wrapper = render(<Tags tags={tags} searchHandler={clickHandlerStub} />);
    expect(wrapper.find('.text-block-container')).toBeDefined();
    expect(wrapper.find('.tag')).toHaveLength(tags.length);
  });
});
