import './getting-started.css';
import React from 'react';

function GettingStarted(){
    return(
        <>
        <div className='getting-started-container'>
            <br></br>
            <h1 className='getting-started-title'>Getting started?</h1>
            <div className='home-flex-container'>
                <div className='home-container1'>
                    <div className="img1"></div>
                    <div className='text-part1'>
                    <h4>Post a Job</h4>
                    <p>
                    <span>Need work done?</span> Posting a job is easy
                        and free. 
                        All you need to do is signup,
                        fill in the post a job
                        form and choose 
                        what method best works for you.
                    </p>
                    </div>
                    <div className="img1_mobile"></div>
                    <br></br>
                    
                </div>

                <div className='home-container1'>
                    <div className="img2"></div>
                    <div className='text-part1'>
                    <h4>Choose a worker</h4>
                    <p>
                        With offers from
                        Creedlancers Nation wide.
                        You can set priorities based on
                        location. Creedlance comes equipped with the
                        necessary tools
                        needed to check the competency of any worker.
                    </p>
                    </div>
                    <div className="img2_mobile"></div>
                    <br></br>
                </div>

                <div className='home-container1'>
                    <div className="img3"></div>
                    <div className='text-part1'>
                    <h4>Pay safely</h4>
                    <p>
                        
                        The method of payment to be used
                        is any that suites your worker and 
                        yourself. 
                        Creedlance also has a
                        list of Trustworthy workers in every Job
                        Category
                    </p>
                    </div>
                    <div className="img3_mobile"></div>
                    <br></br>
                </div>
                
                
            </div>

            <br></br>
            <br></br>
        </div>
        <div className='were-here'>
        <h2 className='h3_mobile'>We're here to help</h2>
                
                <div className="img4_mobile"></div>
       
            <div className='home-container2'>
                
                <div className='text-part2'>
                    <h3>We're here to help</h3>
                    
                    <p className='p2'>
                        Our skilled recruiters can assist you in locating the best freelancer
                        for the job,
                        and our technical co-pilots can even manage the project for you

                    </p>
                    <a href='/contact-us' className='home-contact-us-btn'>Contact us</a>
                </div>
                <div className="img4"></div>

            </div>
            <br></br>
            <hr></hr>
        </div>
        <br></br>
        </>
    )


}

export default GettingStarted;