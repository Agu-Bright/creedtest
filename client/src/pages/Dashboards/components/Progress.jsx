import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

const Progress = ({percentage}) => {
  return (
    <CircularProgressbarWithChildren 
      value={percentage}
      styles={{
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke: `#DAA520`,
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: 'rgba(218, 165, 32, 0.2)',
        },
        background: {
          fill: '#3e98c7',
        },
      }}
    >
      <p className="progress__text">{percentage}%</p>
    </CircularProgressbarWithChildren>
  )
}

export default Progress