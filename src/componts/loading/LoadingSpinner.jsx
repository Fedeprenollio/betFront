import React from 'react';

const LoadingSpinner = () => {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="hexagon" />
          <div className="hexagon" />
          <div className="hexagon" />
          <div className="hexagon" />
          <div className="hexagon" />
          <div className="hexagon" />
        </div>
      </div>
    );
  };
  

export default LoadingSpinner;
