import React from 'react';
import PropTypes from 'prop-types';

function LazyImage(props) {
  const {
    alt,
    src,
    width,
    height,
  } = props;
  return (
    <img
      alt={alt}
      className="lazy"
      data-src={src}
      // data-srcset={srcset}
      // data-sizes={sizes}
      width={width}
      height={height}
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

LazyImage.defaultProps = {
  alt: 'Just a Flickr Photo',
  width: 'auto',
  height: '160',
};

export default LazyImage;
