import './getting_workdone.css';
import React from 'react';

function GettingWorkDone(){
    return(
        <div className='getting-work-done'>

            <div className='text-part11'>
                
                <h2 className='head-txt'>Getting work done has never<br />
                    been <b className='active11'>EASIER</b></h2>
                <hidden-img></hidden-img>
                <p className='check-txt'><check-img></check-img> Get matched with expert creelancers in minutes</p>
                <p className='check-txt'><check-img></check-img>Dedicated 24/7 customer service team</p>
                <p className='check-txt'><check-img></check-img>Anti-fraud measures and protection</p>
                <a href='/postajob_home' className='btn'>Post a Job</a>

            </div>

            <div className='img-part11'>
                <empty-img></empty-img>
        
            </div>
             
        </div>
    )

}

export default GettingWorkDone
