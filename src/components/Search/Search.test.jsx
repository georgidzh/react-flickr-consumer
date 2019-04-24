import React from 'react';
import { shallow } from 'enzyme';

import Search from './Search';
import {
  REST_SERVICE,
  SEARCH_TYPE_TEXT,
  SEARCH_TYPE_TAGS,
  STORAGE_SERVICE,
} from '../../utils/constants';
import { search as text } from '../../utils/text';

let wrapper;

const defaultProps = {
  service: REST_SERVICE,
  totalPosts: 155,
  searchString: '',
  searchType: SEARCH_TYPE_TEXT,
  searchHandler: jest.fn(),
};

const handleSubmittedSpy = jest.spyOn(Search.prototype, 'handleSubmitted');
const handleClearedSpy = jest.spyOn(Search.prototype, 'handleCleared');

afterEach(() => {
  jest.clearAllMocks();
});

describe('<Search />', () => {
  beforeEach(() => {
    wrapper = shallow((
      <Search {...defaultProps} />
    ));
  });

  it('Displays default info text about the current search for rest context', () => {
    expect(wrapper.find('.search-info').text()).toEqual(text.defaultResult[defaultProps.service]);
  });

  it('Displays default info text about the current search for saved context', () => {
    wrapper.setProps({ service: STORAGE_SERVICE });
    expect(wrapper.find('.search-info').text()).toEqual(text.defaultResult[defaultProps.service]);
  });

  it('Displays default info text if the search text string is empty but the type is different', () => {
    wrapper.setProps({ searchType: SEARCH_TYPE_TAGS, searchString: '' });
    expect(wrapper.find('.search-info').text()).toEqual(text.defaultResult[defaultProps.service]);
  });

  it('Display the search tags string with prefix Tags:', () => {
    const expected = 'Tags: "Tag1, Tag2"';
    wrapper.setProps({ searchType: SEARCH_TYPE_TAGS, searchString: 'Tag1, Tag2' });
    expect(wrapper.find('.search-info').text()).toEqual(expected);
  });

  it('Display the search text string without prefix', () => {
    const expected = 'Text';
    wrapper.setProps({ searchType: SEARCH_TYPE_TEXT, searchString: 'Text' });
    expect(wrapper.find('.search-info').text()).toEqual(expected);
  });

  it('doesn\'t update it\'s state if the prop received is the same or empty', () => {
    const expected = 'Text';
    wrapper.setState({ searchString: 'Text' });
    wrapper.setProps({ searchString: '' });
    expect(wrapper.state().searchString).toEqual(expected);

    wrapper.setState({ searchString: 'Text' });
    wrapper.setProps({ searchString: 'Text' });
    expect(wrapper.state().searchString).toEqual(expected);
  });

  it('sets the state with the correct "Tags: " prefix if the received props should update the state and the type is "tags", but not if is "text"', () => {
    let expected = 'Tags: Tag1';
    wrapper.setState({ searchString: 'Text' });
    wrapper.setProps({ searchString: 'Tag1', searchType: SEARCH_TYPE_TAGS });
    expect(wrapper.state().searchString).toEqual(expected);

    expected = 'Text2';
    wrapper.setState({ searchString: 'Text' });
    wrapper.setProps({ searchString: 'Text2', searchType: SEARCH_TYPE_TEXT });
    expect(wrapper.state().searchString).toEqual(expected);
  });

  it('updates the state when the input is changed', () => {
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Plovdiv' } });
    expect(wrapper.state().searchString).toBe('Plovdiv');
  });

  it('calls the submit handler with the correct data for text search', () => {
    wrapper.setState({ searchString: 'Something' });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(handleSubmittedSpy).toHaveBeenCalledTimes(1);
    expect(defaultProps.searchHandler).toHaveBeenCalledWith({
      searchString: 'Something',
      searchType: SEARCH_TYPE_TEXT,
    });
  });

  it('handles the transformation for tags search on submit', () => {
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Tags: Plovdiv' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(handleSubmittedSpy).toHaveBeenCalledTimes(1);
    expect(defaultProps.searchHandler).toHaveBeenCalledWith({
      searchString: 'plovdiv',
      searchType: SEARCH_TYPE_TAGS,
    });
  });

  it('clears the search data and call the search handler with empty data', () => {
    wrapper.setState({ searchString: 'Plovdiv' });
    wrapper.find('form button[type="button"]').simulate('click');
    expect(handleSubmittedSpy).toHaveBeenCalledTimes(0);
    expect(handleClearedSpy).toHaveBeenCalledTimes(1);
    expect(defaultProps.searchHandler).toHaveBeenCalledWith({
      searchString: '',
      searchType: SEARCH_TYPE_TEXT,
    });
  });
});
