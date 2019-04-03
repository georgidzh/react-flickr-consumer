import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { SEARCH_TYPE_TAGS } from '../../../../utils/constants';

const Tag = ({ tag, clickHandler }) => (
  <Badge
    onClick={() => clickHandler({ searchString: tag, searchType: SEARCH_TYPE_TAGS })}
    className="font-weight-normal mr-1 tag"
    pill
    variant="primary"
  >
    {tag}
  </Badge>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Tag;
