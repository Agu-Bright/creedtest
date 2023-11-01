import React from 'react'
import styled from 'styled-components'
import textingImage from '../../../assets/workers/texting.png'
import bidIcon from '../../../assets/workers/bid_icon.png'
import clientIcon from '../../../assets/workers/client_icon.png'

export const ManageCareer = () => {
  return (
    <Container>
      <article>
        <h2>Manage Your Career</h2>
        <img src={textingImage} alt="texting" className='desktop'/>
        <p className='mobile'>
          Stay up to date on the CreedLance.com marketplace
          and keep in touch with your clients.
        </p>
        <ul>
          <li>
            <img src={clientIcon} alt='connect with clients' />
            <p>
              Stay up to date on the Creedlance.com marketplace and keep
              in touch with your clients.
            </p>
          </li>
          <li>
            <img src={bidIcon} alt="bid with Naira" />
            <p>
              Our job alerts system will keep you updated once new projects
              that fit your skills and expertise become available. Bid away!
            </p>
          </li>
        </ul>
      </article>
      <img src={textingImage} alt="texting" />
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 3px solid #daa520;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2.5em 0 1em 2em;
  article{
    display: flex;
    flex-direction: column;
    h2{
      font-size: 2.25em;
      margin: 0;
    }
    .desktop{
      display: none;
    }
    p{
      font-size: 1.25em;
    }
    ul{
      display: flex;
      flex-direction: row;
      width: 100%;
      list-style: none;
      padding: 0;
      justify-content: space-between;
      li{
        max-width: 48%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
          width: 100%;
          word-break: break-word;
        }
      }
    }
  }
  > img, .desktop{
    width: 100%;
    max-width: 31.25em;
    margin: 0 auto;
  }
  @media screen and (max-width: 850px){
    grid-template-columns: 1fr;
    padding: 2em 0.5em;
    border: 0;
    article{
      .desktop{
        display: block;

      }
      .mobile{
        display: none;
      }
      h2{
        font-size: 1.8em;
        margin: 0 auto;
        width: max-content;
      }
      p{
        font-size: 1em;
      }
    }
    >img{
      display: none;
    }
  }
  @media screen and (max-width: 300px){
    article ul{
      flex-direction: column;
      li{
        max-width: 100%;
        width: 100%;
        p{
          text-align: center;
        }
      }
    }
  }
`