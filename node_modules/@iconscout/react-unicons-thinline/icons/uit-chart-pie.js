import React from 'react';
import PropTypes from 'prop-types';

const UitChartPie = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M12,2C6.4863281,2,2,6.4863281,2,12s4.4863281,10,10,10s10-4.4863281,10-10S17.5136719,2,12,2z M12.5,3.0302734c4.5604248,0.2518311,8.2147827,3.9227295,8.4597168,8.4853516H12.5V3.0302734z M12,21c-4.9628906,0-9-4.0371094-9-9c0-4.7941284,3.7702026-8.7128906,8.5-8.9746704V12c0,0.0878906,0.0234375,0.1738281,0.0673828,0.25l4.4877319,7.7738647C14.8347778,20.6431274,13.4596558,21,12,21z M16.9169922,19.5175781l-4.0421143-7.0019531h8.0758057C20.7855225,15.3491821,19.2931519,17.9616699,16.9169922,19.5175781z'
  }));
};

UitChartPie.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitChartPie.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitChartPie;