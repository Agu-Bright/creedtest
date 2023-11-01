import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Filter } from './Filter'
import { JobBoard } from './JobBoard'

export const Content = ({showAuthModal}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(false)
      if(window.innerWidth <= 768) {
        setIsMobile(true);
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Container>
      {(showFilter || !isMobile) && <Filter hideFilter={() => setShowFilter(false)} allPosts={allPosts} />}
      <JobBoard
        allPosts={allPosts}
        setAllPosts={setAllPosts}
        showFilter={() => setShowFilter(true)}
        showAuthModal={showAuthModal}
      />
    </Container>
  )
}

const Container = styled.ul`
  list-style: none;
  display: flex;
  padding: 4em 2.5em 4em 2.5em;
  gap: 1em;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  *:not(li){
    margin: 0;
  }
  div, ul{
    padding: 0;
  }
  @media screen and (max-width: 800px){
    padding: 3em 0.5em;
  }
  @media screen and (max-width: 768px) {
    padding: 0 0.5em;
  }
  @media screen and (max-width: 500px){
    display: block;
  }
  @media screen and (max-width: 470px){
    padding: 4em 0.5em;
  }
`
