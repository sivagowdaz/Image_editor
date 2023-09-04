import React from 'react';

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div >
        <img style={{
            height:window.innerHeight * 0.9,
            with:'content-fit'
        }} src={imageUrl} alt="Fetched" />
    </div>
  );
};

export default ImageDisplay;