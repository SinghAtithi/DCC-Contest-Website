import React from 'react';
import PropTypes from 'prop-types';

const UitSubject = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M2.5,8h19C21.776123,8,22,7.776123,22,7.5S21.776123,7,21.5,7h-19C2.223877,7,2,7.223877,2,7.5S2.223877,8,2.5,8z M13.5,17h-11C2.223877,17,2,17.223877,2,17.5S2.223877,18,2.5,18h11c0.276123,0,0.5-0.223877,0.5-0.5S13.776123,17,13.5,17z M21.5,12h-19C2.223877,12,2,12.223877,2,12.5S2.223877,13,2.5,13h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,12,21.5,12z'
  }));
};

UitSubject.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitSubject.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitSubject;