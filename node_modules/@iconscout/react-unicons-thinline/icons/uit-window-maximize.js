import React from 'react';
import PropTypes from 'prop-types';

const UitWindowMaximize = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M21.5,2h-19C2.4998169,2,2.4996338,2,2.4993896,2C2.2234497,2.0001831,1.9998169,2.223999,2,2.5v19c0,0.0001831,0,0.0003662,0,0.0005493C2.0001831,21.7765503,2.223999,22.0001831,2.5,22h19c0.0001831,0,0.0003662,0,0.0006104,0C21.7765503,21.9998169,22.0001831,21.776001,22,21.5v-19c0-0.0001831,0-0.0003662,0-0.0006104C21.9998169,2.2234497,21.776001,1.9998169,21.5,2z M21,21H3V9.5h18V21z M21,8.5H3V3h18V8.5z'
  }));
};

UitWindowMaximize.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitWindowMaximize.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitWindowMaximize;