import React from 'react'
import TruckAnimation from './truck'

const Picking = () => {
  return (
    <div>
      <h3>The core method that uses linear programming to determine the optimal routes for the vehicles to minimize the total picking time. It calculates the time required for each vehicle to pick up the assigned items is: Zone Batch Picking</h3>
      <h3>zone_batch_picking: Splits the warehouse into different zones and picks items zone by zone.</h3>
      <TruckAnimation />
    </div>
  )
}

export default Picking