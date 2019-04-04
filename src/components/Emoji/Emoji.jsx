/* eslint-disable react/prop-types */
import React from 'react';

const Emoji = ({ icon, label, ...rest }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label || null}
    aria-hidden={label ? 'false' : 'true'}
    {...rest}
  >
    {icon}
  </span>
);

export default Emoji;
