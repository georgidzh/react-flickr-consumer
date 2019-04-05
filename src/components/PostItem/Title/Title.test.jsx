import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import Title from './Title';

let wrapper;

const defaultProps = {
  title: 'Title',
  link: 'http://example.com?title',
  author: 'Author',
  authorLink: 'http://example.com?author',
};

beforeEach(() => {
  wrapper = shallow((
    <Title {...defaultProps} />
  ));
});

describe('<Title />', () => {
  it('renders self', () => {
    const comp = shallow(<Title {...defaultProps} />);
    expect(comp.find('.card-title').length).toEqual(1);
  });

  it('renders the title wrapped in anchor tag with href to the post', () => {
    expect(wrapper.find('a[href="http://example.com?title"]').length).toEqual(1);
    expect(wrapper.find('a[href="http://example.com?title"]').text()).toEqual('Title');
  });

  it('renders the author username wrapped in anchor tag with href to author', () => {
    expect(wrapper.find('a[href="http://example.com?author"]').length).toEqual(1);
    expect(wrapper.find('a[href="http://example.com?author"]').text()).toEqual('Author');
  });
});
