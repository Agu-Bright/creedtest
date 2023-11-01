import './for_clients.css'
import React from 'react'
function ForClients(){
    return(
        <>
        <br></br>
        <br></br>
        <h3 className='first-header'>Discover Talents your own way.</h3>
        <div className='for-clients'>
            
            <div className='img-part'>
                
                <clients-gif></clients-gif>

            </div>
            <div className='text-part'>
            <for-clients-img></for-clients-img>
                <p className='para-text'>Work with Nigeria's largest Jobforce of independent
                    professionals and businesses to complete tasks ranging from
                    mini projects to large-scale projects/jobs.</p>
                
                <a href="/browse/categories" className='learn-how-btn'>View services</a>
                <br></br>

            </div>
            <br></br>
        </div>
        </>
    )

}

export default ForClients
