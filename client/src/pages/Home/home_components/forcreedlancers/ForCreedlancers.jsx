import React from 'react'
import './for_creedlancers.css'
const ForCreedLancers = () => {
  return (
    <div className='for-creedlancers'>
    <h3 className='hidden-header'>Every job, we believe, has a worker.</h3>
    <div className='img-part'>
        <for-creedlancers-img></for-creedlancers-img>
        <creedlance-gif></creedlance-gif>

    </div>
    <div className='text-part'>
        <div className='space-before-text'></div>
        <p className='heading-text'>Get multiple job offers and work with multiple businesses, companies and startups to get work done, all based off what services you offer. Here at Creedlance we believe every job has a worker.
 </p>
      
        <a href='/workers'><div className='get-started-btn'>Learn more</div></a>
        <br></br>

    </div>

</div>
  )
}

export default ForCreedLancers