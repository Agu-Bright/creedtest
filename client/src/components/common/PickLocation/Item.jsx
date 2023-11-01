import React from 'react'
import styled from 'styled-components';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Item = ({title, list, setPreview}) => {
  const showList = () => {
    setPreview({
      title,
      list
    })
  }

  return (
    <Container onClick={showList}>
      <p>{title}</p>
      <ArrowForwardIosOutlinedIcon />
    </Container>
  )
}

export default Item

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 0.6rem;
  height: 35px;
  cursor: pointer;

  > p {
    margin: 0;
    font-family: inter;
  }

  > .MuiSvgIcon-root {
    font-size: 1rem;
  }

  @media(min-width: 1024px) {
    padding: 0 0.6rem;
    height: 40px;
    
    :hover {
      background: lightgray;
    }

    :hover > .MuiSvgIcon-root {
      color: #DAA520;
    }

    > p {
      font-size: 1rem;
    }
  }
`