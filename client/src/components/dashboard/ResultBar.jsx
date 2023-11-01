import React from 'react'
import './ResultBar.css'

const ResultBar = () => {
  return (
    <div className="result__bar">
      <div className="left">
        <h5>Top results</h5>
      </div>
      <div className="right">
        <h6>Sort by</h6>
        <select>
          <option value="latest">latest</option>
        </select>
      </div>
    </div>
  )
}

export default ResultBar