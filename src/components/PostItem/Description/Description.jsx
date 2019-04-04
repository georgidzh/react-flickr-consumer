import React from 'react';
import PropTypes from 'prop-types';
import Dotdotdot from 'react-dotdotdot';

function Description({ description, truncate }) {
  if (!description.length) {
    return (
      <div className="description">
        <h6>Description:</h6>
        <p className="text-muted">Not provided</p>
      </div>
    );
  }

  return (
    <div className="description">
      <h6>Description:</h6>
      {truncate ? (
        <Dotdotdot clamp={3}>
          {/* The html is sanitized when transforming posts */}
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Dotdotdot>
      ) : (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
}

Description.defaultProps = {
  truncate: false,
};

Description.propTypes = {
  description: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};


export default Description;
