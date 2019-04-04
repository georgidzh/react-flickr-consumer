import React from 'react';
import PropTypes from 'prop-types';

import Tag from './Tag/Tag';

function Tags({ tags, searchHandler }) {
  return (
    <div className="tags">
      <h6>Tags:&nbsp;</h6>
      {tags.length
        ? tags.map(tag => <Tag key={tag} tag={tag} clickHandler={searchHandler} />)
        : <p className="text-muted">Not provided</p>
      }
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchHandler: PropTypes.func.isRequired,
};

export default Tags;
