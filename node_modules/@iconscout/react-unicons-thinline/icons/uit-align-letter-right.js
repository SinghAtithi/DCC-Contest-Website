import React from 'react';
import PropTypes from 'prop-types';

const UitAlignLetterRight = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M9.5,4h12C21.776123,4,22,3.776123,22,3.5S21.776123,3,21.5,3h-12C9.223877,3,9,3.223877,9,3.5S9.223877,4,9.5,4z M21.5,21h-19C2.223877,21,2,21.223877,2,21.5S2.223877,22,2.5,22h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,21,21.5,21z M21.5,17h-11c-0.276123,0-0.5,0.223877-0.5,0.5s0.223877,0.5,0.5,0.5h11c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,17,21.5,17z M21.5,11h-19C2.223877,11,2,11.223877,2,11.5S2.223877,12,2.5,12h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,11,21.5,11z M21.5,7h-19C2.223877,7,2,7.223877,2,7.5S2.223877,8,2.5,8h19C21.776123,8,22,7.776123,22,7.5S21.776123,7,21.5,7z'
  }));
};

UitAlignLetterRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitAlignLetterRight.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitAlignLetterRight;