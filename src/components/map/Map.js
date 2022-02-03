import React from 'react';
import './map.css'

const Map = () => {
  const openMap = () => {
    window.open("https://www.google.com/maps/search/Restaurants/@23.9022912,89.1182966,15z/data=!3m1!4b1", "_blank");
  };
  return (
    <div className='map' >
      <h1 onClick={openMap} >map</h1>
    </div>
  );
}

export default Map;
