/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { SEARCH_TYPE_TEXT, SEARCH_TYPE_TAGS } from '../../utils/constants';
import { search as text } from '../../utils/text';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      searchString: '',
      stringFromProps: '',
    };
    this.state = this.defaultState;
    this.textInput = React.createRef();
    this.handleCleared = this.handleCleared.bind(this);
    this.handleSubmitted = this.handleSubmitted.bind(this);
  }

  componentDidMount() {
    const { searchString, searchType } = this.props;
    if (searchString.length) {
      const stringStartsWithTags = searchString.toLowerCase().startsWith('tags:');
      const string = searchType === SEARCH_TYPE_TAGS && !stringStartsWithTags
        ? `Tags: ${searchString}`
        : searchString;

      this.setState({
        searchString: string,
        stringFromProps: this.props.searchString,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.searchString !== this.props.searchString
      || nextState.searchString !== this.state.searchString;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.stringFromProps !== props.searchString) {
      if (props.searchString.length) {
        return {
          searchString: props.searchType === SEARCH_TYPE_TAGS ? `Tags: ${props.searchString}` : props.searchString,
          searchType: props.searchType,
          stringFromProps: props.searchString,
        };
      }
    }
    return null;
  }

  getTextForResults = (service) => {
    const { searchString, searchType } = this.props;
    if (searchString === '') {
      return text.defaultResult[service];
    }

    return searchType === SEARCH_TYPE_TAGS
      ? `Tags: "${searchString}"`
      : searchString;
  };

  handleCleared() {
    this.setState(this.defaultState, () => {
      this.props.searchHandler({
        searchString: '',
        searchType: SEARCH_TYPE_TEXT,
      });
    });
  }

  handleSubmitted(e) {
    e.preventDefault();
    let { searchString } = this.state;
    let searchType;
    searchString = searchString.trim().toLowerCase();
    if (searchString.startsWith('tags:')) {
      searchString = searchString.replace('tags:', '').trim();
      searchType = SEARCH_TYPE_TAGS;
    } else {
      // eslint-disable-next-line prefer-destructuring
      searchString = this.state.searchString;
      searchType = SEARCH_TYPE_TEXT;
    }
    this.props.searchHandler({ searchString, searchType });
  }

  render() {
    const { searchString } = this.state;
    const { service, totalPosts } = this.props;
    const placeholder = text.placeholder[service];
    const helperText = 'Search by tags like this: "Tags: Plovdiv, Nature"';
    return (
      <div className="row mb-4 search">
        <div className="col-md-7">
          <h5 className="pt-1">
            <span className="mr-1">Displaying results for:</span>
            <span className="mr-1 search-info">{this.getTextForResults(service)}</span>
            <span>{`(Total: ${totalPosts})`}</span>
          </h5>
        </div>
        <div className="col-md-5">
          <form onSubmit={this.handleSubmitted} className="form-inline">
            <div className="input-group">
              <input
                value={searchString}
                onChange={e => this.setState({ searchString: e.target.value })}
                type="text"
                placeholder={placeholder}
                className="form-control"
                aria-label="Search"
              />
              <div className="input-group-append" id="button-addon4">
                <button type="submit" className="btn btn-outline-secondary">
                  Search
                </button>
                <button
                  onClick={this.handleCleared}
                  type="button"
                  className="btn btn-danger"
                >
                  Clear
                </button>
              </div>
            </div>
            <small className="pl-1 text-muted">{helperText}</small>
          </form>
        </div>
      </div>
    );
  }
}

Search.defaultProps = {
  totalPosts: 0,
};


Search.propTypes = {
  service: PropTypes.string.isRequired,
  totalPosts: PropTypes.number,
  searchString: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default Search;
