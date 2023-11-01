import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Pagination } from '@mui/material'
import { JobBoardFilter } from './JobBoardFilter'
import JobBoardJob from './JobBoardJob'

export const JobBoard = ({showFilter, showAuthModal, allPosts, setAllPosts}) => {
  const mainConRef = useRef(null);

  const makeSticky = () => {
    if(allPosts.length > 2) {
      if (window.innerWidth >= 769){
        if (document.querySelector("html").scrollTop >= 444){
            mainConRef.current.style.width = "calc(100% - 270px)"
            mainConRef.current.style.marginLeft = "320px"
        }else{
          mainConRef.current.style = {
            position: "static"
          }
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", makeSticky);

    return () => {
      window.removeEventListener("scroll", makeSticky)
    }
  }, [allPosts])

  return (
    <Container ref={mainConRef}>
      <div className="content-container">
        <JobBoardFilter showFilter={showFilter} />
        <JobBoardJob showAuthModal={showAuthModal} setAllPosts={setAllPosts} />
      </div>
      {/* <Pagination count={10} /> */}
    </Container>
  )
}

const Container = styled.li`
  flex: 1;
  .content-container{
    padding: 1.5em 1em 0 1em;
    background-color: #f0eeee;
    border: 1px solid #1c1c1c;
  }
  .MuiPagination-root {
    padding: 0.5em 0;
    ul{
      justify-content: center;
    }
  }
  @media screen and (max-width: 300px){
    .content-container{
      padding: 1.5em 0 0 0
    }
  }
`