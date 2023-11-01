import React from 'react'
import styled from "styled-components"

import { CategoriesContent } from '../../BrowseCategories/components/Content'
import { ContentSearchBar } from './ContentSearchBar'
import { Grid } from './Grid'
import { Pagination } from '@mui/material'

export const ServicesContent = () => {
  return (
    <Container>
      <li className='desktop'>
        <CategoriesContent className="service" />
      </li>
      <li>
        <ContentSearchBar className="desktop"/>
        <Grid />
        <Pagination count={10} />
      </li>
    </Container>
  )
}

const Container = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 3.5em 0 1.5em 0;
  justify-content: space-around;
  li .MuiPagination-root {
    padding: 1.8em 0;
    ul{
      justify-content: center;
    }
  }
  .desktop ~ li{
    min-width: 60%;
  }
  @media screen and (max-width: 1430px){
    .desktop{
      display: none;
    }
  }
`
