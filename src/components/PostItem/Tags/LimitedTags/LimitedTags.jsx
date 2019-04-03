import React from 'react';
import PropTypes from 'prop-types';

import Tags from '../Tags';

class LimitedTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }

  render() {
    const { isExpanded } = this.state;
    const { tags, limit, searchHandler } = this.props;

    if (tags.length <= limit) {
      return (
        <div className="text-block-container limited-tags">
          <Tags tags={tags} searchHandler={searchHandler} />
        </div>
      );
    }

    const shownTags = isExpanded ? tags : tags.slice(0, limit);
    const hiddenCount = tags.length - limit;
    return (
      <div className={`text-block-container limited-tags ${!isExpanded ? 'limited' : null}`}>
        <Tags tags={shownTags} searchHandler={searchHandler} />
        <button onClick={this.toggle} className="btn-text" type="button">
          {isExpanded ? 'hide tags' : `${hiddenCount} more ${hiddenCount === 1 ? 'tag' : 'tags'}`}
        </button>
      </div>
    );
  }
}

LimitedTags.defaultProps = {
  limit: 3,
};

LimitedTags.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  limit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};

export default LimitedTags;
