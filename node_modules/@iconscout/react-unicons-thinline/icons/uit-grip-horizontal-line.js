import React from 'react';
import PropTypes from 'prop-types';

const UitGripHorizontalLine = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M2.5,11h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,10,21.5,10h-19C2.223877,10,2,10.223877,2,10.5S2.223877,11,2.5,11z M21.5,14h-19C2.223877,14,2,14.223877,2,14.5S2.223877,15,2.5,15h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,14,21.5,14z'
  }));
};

UitGripHorizontalLine.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitGripHorizontalLine.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitGripHorizontalLine;