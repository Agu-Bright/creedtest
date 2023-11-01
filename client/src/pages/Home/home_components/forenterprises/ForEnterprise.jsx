import './for_enterprise.css'
import React from 'react'

function ForEnterprises(){
    return(
        <div className='for-enterprises'>
            <br></br>
            <h3 className='hidden-header'>Scale your business with Enterprise Suite.</h3>
            <div className='img-part'>
                <for-enterprises-img></for-enterprises-img>
                <enterprise-gif></enterprise-gif>

            </div>
            <div className='text-part'>
                <h4 className='heading-text'>As a Registered company or enterprise 
                in Nigeria, you can sign up 
                in Creedlance as a company,<br></br>how is this beneficial to your firm? </h4>
                <ul>
                    <li className='bullet-point'>Get exposure to more people and enterprise 
                    who will need your service or products</li>
                    <li className='bullet-point'>Acquire services or work done for cheaper than 
                    you normally would. </li>
                    <li className='bullet-point'>Stand out from other Creedlancers as a registered business</li>

                </ul>
                <a href='/enterprise' className='get-started-btn'>Learn more</a>
                <br></br>

            </div>
            <br></br>
        </div>
    )

}

export default ForEnterprises
