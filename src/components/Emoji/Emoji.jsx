/* eslint-disable react/prop-types */
import React from 'react';

const Emoji = ({ symbol, label, ...rest }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label || null}
    aria-hidden={label ? 'false' : 'true'}
    {...rest}
  >
    {symbol}
  </span>
);

export default Emoji;
