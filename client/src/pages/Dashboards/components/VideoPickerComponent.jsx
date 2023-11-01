import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const VideoPickerComponent = ({hide, __pickVideo, uploadedVideos, setUploadedVideos}) => {

  useEffect(() => {
    __pickVideo()
  }, [])

  useEffect(() => {}, [uploadedVideos])

  return (
    <React.Fragment>
      <Container id="create-post-video-picker">
        {
          uploadedVideos.length === 0 && (
            <React.Fragment>
              <Button onClick={__pickVideo}>
                Select videos to share
              </Button>
            </React.Fragment>
          )
        }
        {uploadedVideos.length > 0 && (
          <VideosList>
            {
              uploadedVideos.map((video, i) => (
                <VideoContainer key={i}>
                  <video 
                    src={video} 
                    controls
                    onLoadEnd={() => URL.revokeObjectURL(video)} 
                  />
                </VideoContainer>
              ))
            }
          </VideosList>
        )}
      </Container>
      <Footer>
        <button className='cancel' onClick={hide}>Cancel</button>
        <button disabled={uploadedVideos.length === 0}>Post</button>
      </Footer>
    </React.Fragment>
  )
}

export default VideoPickerComponent

const Container = styled.div`
  flex: 1;
  display: flex;
`

const Button = styled.button`
  border: none;
  color: #DAA520;
  align-self: center;
  margin: 0 auto;
  background: transparent;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  transition: 165ms;

  @media (min-width: 1024px) {
    font-size: 1.1em;

    :hover {
      background: #F8EDD2;
    }

    :active {
      transform: scale(0.9);
    }
  }
`

const VideosList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    max-height: 260px;
  }
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;

  video {
    width: 100%;
    object-fit: contain;
  }
`

const Footer = styled.div`
  height: 42px;
  padding: 0 1rem;
  border-top: 1px solid #dad9d9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  div {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  div > .MuiSvgIcon-root {
    color: #6c6a6a;
    cursor: pointer;
  }

  button {
    font-size: 1rem;
    padding: .35rem 1.2rem;
    min-width: 60px;
    border-radius: 20px;
    border: none;
    color: #fff;
    background-color: #DAA520;
    transition: 165ms;
  }

  button:disabled {
    color: #aeadad;
    background-color: #EBEBEB;
  }

  button.cancel {
    color: #DAA520;
    background-color: #fff;
    border: 1px solid #DAA520;
    padding: .25rem 1rem;
    font-family: inter;
    /* transition: 165ms; */
  }

  @media (min-width: 370px) {
    height: 49px;
  }

  @media (min-width: 1024px) {
    height: 59px;
  }
`