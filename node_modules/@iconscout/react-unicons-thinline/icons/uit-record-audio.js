import React from 'react';
import PropTypes from 'prop-types';

const UitRecordAudio = (props) => {
  const { color, size, ...otherProps } = props
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color,
    ...otherProps
  }, React.createElement('path', {
    d: 'M12,2C6.4771729,2,2,6.4771729,2,12s4.4771729,10,10,10c5.5201416-0.0064697,9.9935303-4.4798584,10-10C22,6.4771729,17.5228271,2,12,2z M12,21c-4.9705811,0-9-4.0294189-9-9s4.0294189-9,9-9c4.9683228,0.0054321,8.9945679,4.0316772,9,9C21,16.9705811,16.9705811,21,12,21z M12,6c-3.3137207,0-6,2.6862793-6,6s2.6862793,6,6,6c3.3121948-0.0036011,5.9963989-2.6878052,6-6C18,8.6862793,15.3137207,6,12,6z M12,17c-2.7614136,0-5-2.2385864-5-5s2.2385864-5,5-5c2.7600708,0.0032349,4.9967651,2.2399292,5,5C17,14.7614136,14.7614136,17,12,17z'
  }));
};

UitRecordAudio.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

UitRecordAudio.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default UitRecordAudio;