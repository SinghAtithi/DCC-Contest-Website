import React from 'react';
import PropTypes from 'prop-types';

const UitPentagon = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M21.7949219,9.4560547l-9.5-6.9228516c-0.1761475-0.1269531-0.4136963-0.1269531-0.5898438,0l-9.5,6.9228516C2.0309448,9.5839844,1.9581909,9.80896,2.0244141,10.0146484l3.6289062,11.2021484c0.0667725,0.2061768,0.2588501,0.3458252,0.4755859,0.3457031h11.7421875c0.2167358,0.0001221,0.4088135-0.1395264,0.4755859-0.3457031l3.6289062-11.2021484C22.0418091,9.80896,21.9690552,9.5839844,21.7949219,9.4560547z M17.5078125,20.5625H6.4921875L3.0869141,10.0507812L12,3.5566406l8.9130859,6.4941406L17.5078125,20.5625z'
  }));
};

UitPentagon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitPentagon.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitPentagon;