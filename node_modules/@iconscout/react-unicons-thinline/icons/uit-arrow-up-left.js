import React from 'react';
import PropTypes from 'prop-types';

const UitArrowUpLeft = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M7.8676147,7.0957031h9.5845337C17.7546997,7.0957031,18,6.8504028,18,6.5478516S17.7546997,6,17.4521484,6H6.5478516C6.5477295,6,6.5475464,6,6.5474243,6C6.2449951,6.0001221,5.9998779,6.2454224,6,6.5478516v10.9042969c0,0.0001221,0,0.0003052,0,0.0004272C6.0001221,17.7550049,6.2454224,18.0001221,6.5478516,18c0.0001221,0,0.0003052,0,0.0004272,0c0.3024292-0.0001221,0.5475464-0.2454224,0.5474243-0.5478516V7.8667603l9.9707031,9.9711304c0.1022949,0.1022949,0.2410889,0.1596069,0.3857422,0.1591797c0.1450195,0.0002441,0.2841797-0.057373,0.3865967-0.1600342c0.2125854-0.2130127,0.2121582-0.5580444-0.0008545-0.7706299L7.8676147,7.0957031z'
  }));
};

UitArrowUpLeft.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitArrowUpLeft.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitArrowUpLeft;