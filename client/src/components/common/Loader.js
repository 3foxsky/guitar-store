import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return (
    <img src="/images/loader.gif" alt="loader" style={{
      position: 'relative',
      top: '200px',
      height: '100px',
      margin: '0 auto',
      display: 'block',
    }} /> 
  );
};

export default Loader;