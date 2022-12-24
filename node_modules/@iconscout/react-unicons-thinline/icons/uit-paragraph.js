import React from 'react';
import PropTypes from 'prop-types';

const UitParagraph = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M13.5,14h-11C2.223877,14,2,14.223877,2,14.5S2.223877,15,2.5,15h11c0.276123,0,0.5-0.223877,0.5-0.5S13.776123,14,13.5,14z M21.5,9h-19C2.223877,9,2,9.223877,2,9.5S2.223877,10,2.5,10h19c0.276123,0,0.5-0.223877,0.5-0.5S21.776123,9,21.5,9z'
  }));
};

UitParagraph.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitParagraph.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitParagraph;