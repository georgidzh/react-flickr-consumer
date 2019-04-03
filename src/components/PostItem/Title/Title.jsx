import React from 'react';
import PropTypes from 'prop-types';
import Dotdotdot from 'react-dotdotdot';

const Title = (props) => {
  const {
    title,
    link,
    username,
    authorLink,
  } = props;

  return (
    <div className="card-title">
      <h5 title={title}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Dotdotdot tagName="span" clamp={1}>
            {title.length ? title : 'No title'}
          </Dotdotdot>
        </a>
      </h5>
      <h6>
        <Dotdotdot tagName="span" clamp={1}>
          by&nbsp;
          <a href={authorLink} target="_blank" rel="noopener noreferrer">{username}</a>
        </Dotdotdot>
      </h6>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  authorLink: PropTypes.string.isRequired,
};


export default Title;
