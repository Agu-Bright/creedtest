import React from 'react'
import styled from 'styled-components'
import Item from './Item'

const Group = ({initial='A', list=[], setPreview}) => {
  return (
    <Container>
      <Initial>{initial}</Initial>
      <List>
        {list.map(item => (
          <Item
            key={item.title} 
            title={item.title}
            list={item.list} 
            setPreview={setPreview}
          />
        ))}
      </List>
    </Container>
  )
}

export default Group

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
`

const Initial = styled.p`
  font-size: 1.1rem;
  font-family: interbold;
  width: 20px;
  margin: 0;
`

const List= styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`