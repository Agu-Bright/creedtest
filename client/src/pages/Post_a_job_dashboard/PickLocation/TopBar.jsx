import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TopBar = ({hideModal, setQuery}) => {
  return (
    <Container>
      <p className='modal__title'>
        All states in Nigeria
        <span>
          1,239,921,004 ads
        </span>
      </p>
      <SearchBar>
        <ArrowBackIosNewOutlinedIcon 
          onClick={hideModal}
        />
        <SearchOutlinedIcon />
        <input type="text" placeholder='Search state, city, or district......' onChange={e => setQuery(e.target.value)} />
      </SearchBar>
    </Container>
  )
}

export default TopBar

const Container = styled.div`
  background-color: #DAA520;
  padding-bottom: 7px;

  > .modal__title {
    font-size: 0.94rem;
    font-family: intersemibold;
    background-color: #DAA520;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;
    margin: 0;
  }

  > .modal__title > span {
    font-size: 0.63rem;
    font-family: intermedium;
    color: #3F3E3E;
  }

  @media(min-width: 1024px){
    display: flex;
    padding-bottom: 0;
    background-color: transparent;
    justify-content: space-between;
    padding: 1rem 1rem;

    > .modal__title {
      background-color: transparent;
      padding: 0;
      font-size: 1rem;
      font-family: inter;
    }

    > .modal__title > span {
      font-size: 0.75rem;
      color: #6C8EA0;
    }
  }
`
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 3rem;
  gap: 5px;
  padding: 0 0 0 0.7rem;

  > .MuiSvgIcon-root {
    font-size: 1.4rem;
  }

  > .MuiSvgIcon-root:nth-child(2) {
    display: none;
  }

  > input {
    height: 100%;
    padding-right: 1rem;
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
  }

  @media(min-width: 1024px) {
    background-color: #fff;
    border-radius: 4px;
    height: 40px;

    > .MuiSvgIcon-root:nth-child(2) {
      display: inline;
      color: #6C8EA0;
    }

    > .MuiSvgIcon-root:nth-child(1) {
      display: none;
    }
  }
`