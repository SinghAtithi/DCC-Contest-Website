import React from 'react';
import PropTypes from 'prop-types';

const UitThLarge = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M20.4707031,3H3.5292969C3.2370605,3.0002441,3.0002441,3.2370605,3,3.5292969v16.9414062C3.0002441,20.7629395,3.2370605,20.9997559,3.5292969,21h16.9414062C20.7629395,20.9997559,20.9997559,20.7629395,21,20.4707031V3.5292969C20.9997559,3.2370605,20.7629395,3.0002441,20.4707031,3z M11.5,19.9414062H4.0585938V12.5H11.5V19.9414062z M11.5,11.5H4.0585938V4.0585938H11.5V11.5z M19.9414062,19.9414062H12.5V12.5h7.4414062V19.9414062z M19.9414062,11.5H12.5V4.0585938h7.4414062V11.5z'
  }));
};

UitThLarge.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitThLarge.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitThLarge;