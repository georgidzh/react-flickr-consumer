import React from 'react';
import PropTypes from 'prop-types';
import Dotdotdot from 'react-dotdotdot';

const Title = (props) => {
  const {
    title,
    link,
    author,
    authorLink,
  } = props;

  return (
    <div className="card-title">
      <h5 title={title}>
        <Dotdotdot tagName="span" clamp={1}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title.length ? title : 'No title'}
          </a>
        </Dotdotdot>
      </h5>
      <h6>
        <Dotdotdot tagName="span" clamp={1}>
          by&nbsp;
          <a href={authorLink} target="_blank" rel="noopener noreferrer">{author}</a>
        </Dotdotdot>
      </h6>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorLink: PropTypes.string.isRequired,
};


export default Title;
