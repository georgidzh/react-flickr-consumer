import React from 'react';
import { mount, render } from 'enzyme';
import sinon from 'sinon';
import LimitedTags from './LimitedTags';

describe('<LimitedTags />', () => {
  it('should contain text if the tags array is empty', () => {
    const clickHandlerStub = sinon.spy();
    const tags = [];
    const wrapper = render(<LimitedTags tags={tags} searchHandler={clickHandlerStub} />);
    expect(wrapper.text()).toContain('Not provided');
  });

  it('it should contain all tags without expand button if tags are less than a given limit', () => {
    const clickHandlerStub = sinon.spy();
    const tags1 = ['one', 'two', 'three', 'four'];
    const wrapper1 = render(
      <LimitedTags limit={4} tags={tags1} searchHandler={clickHandlerStub} />,
    );
    expect(wrapper1.find('.tag').length).toEqual(4);
    expect(wrapper1.find('button').length).toEqual(0);
  });

  it(`it should contain the limited number of tags and an expand button if tags are 
      more than a given limit, and display count of ho many tag there are ("tag" for 1 "tags" for more)`, () => {
    const clickHandlerStub = sinon.spy();
    const tags1 = ['one', 'two', 'three', 'four', 'five'];
    const wrapper1 = render(
      <LimitedTags limit={4} tags={tags1} searchHandler={clickHandlerStub} />,
    );
    expect(wrapper1.find('.tag').length).toEqual(4);
    expect(wrapper1.find('button').length).toEqual(1);
    expect(wrapper1.text()).toContain('1 more tag');

    const tags2 = ['one', 'two', 'three', 'four', 'five', 'six'];
    const wrapper2 = render(
      <LimitedTags limit={4} tags={tags2} searchHandler={clickHandlerStub} />,
    );
    expect(wrapper2.find('.tag').length).toEqual(4);
    expect(wrapper2.find('button').length).toEqual(1);
    expect(wrapper2.text()).toContain('2 more tags');
  });


  it(`clicking the button updates the state and show the rest of the tags 
      and can toggle by clicking again`, () => {
    const clickHandlerStub = sinon.spy();
    const tags1 = ['one', 'two', 'three', 'four', 'five'];
    const wrapper1 = mount(
      <LimitedTags limit={4} tags={tags1} searchHandler={clickHandlerStub} />,
    );
    wrapper1.find('button').simulate('click');
    expect(wrapper1.state('isExpanded')).toEqual(true);
    expect(wrapper1.find('span.tag').length).toEqual(5);
    wrapper1.find('button').simulate('click');
    expect(wrapper1.state('isExpanded')).toEqual(false);
    expect(wrapper1.find('span.tag').length).toEqual(4);
  });
});
