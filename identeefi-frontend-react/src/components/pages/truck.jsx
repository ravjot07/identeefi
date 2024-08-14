import React from 'react';
import '../../css/TruckAnimation.css'; // Import the CSS file for the animation
import truckImg from '../../img/truck.png'; // Importing the truck image
import startImg from '../../img/ware.png'; // Importing the start image
import stopImg from '../../img/ware.png';   // Importing the stop image
import endImg from '../../img/ware.png';     // Importing the end image

const TruckAnimation = () => {
  return (
    <div className="map-container">
      <img src={truckImg} alt="Truck" className="truck" />
      <img src={startImg} alt="Start" className="start" />
      <img src={stopImg} alt="Stop 1" className="stop stop-1" />
      <img src={stopImg} alt="Stop 2" className="stop stop-2" />
      <img src={stopImg} alt="Stop 3" className="stop stop-3" />
      <img src={endImg} alt="End" className="end" />
    </div>
  );
};

export default TruckAnimation;
