import React from 'react';
import PropTypes from 'prop-types';

const PostsCounter = (props) => {
  const { showing, total } = props;

  return (
    <span className="pr-2 posts-counter text-white-50">
      {` ${showing} from ${total} photos`}
    </span>
  );
};

PostsCounter.propTypes = {
  total: PropTypes.number.isRequired,
  showing: PropTypes.number.isRequired,
};

export default PostsCounter;
