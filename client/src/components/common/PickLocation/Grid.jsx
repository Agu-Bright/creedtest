import React, { useContext } from 'react'
import styled from 'styled-components'
import Group from './Group'
import { locationData } from './data'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { motion, AnimatePresence } from 'framer-motion'
// import { LocationContext } from '../../../../provider/Location';

const Grid = ({hideLocationPicker, query, onPick}) => {
  const [preview, setPreview] = React.useState({title: '', list: []});
  // const {dispatch} = useContext(LocationContext)

  const hidePreview = () => {
    setPreview({title: '', list: []})
  }

  const setLocation = (location) => {
    // dispatch({
    //   type: 'SET_LOCATION',
    //   payload: location
    // })

    onPick(location)

    hideLocationPicker()
  }

  return (
    <Container>
      {!preview.title && (
        <React.Fragment>
        <Column>
          {locationData.slice(0, 6).map(group => {
            if(
              group.initial.toLowerCase().includes(query.toLowerCase()) 
              || 
              group.list.some(cat => cat.title.toLowerCase().includes(query.toLowerCase()))
            ){
              return (
                <Group
                  key={group.initial}
                  query={query}
                  initial={group.initial}
                  list={group.list}
                  setPreview={setPreview}
                />
              )
            }
            
            return;
            })}
        </Column>
        <Column>
          {locationData.slice(6, 12).map(group => {
            if(
              group.initial.toLowerCase().includes(query.toLowerCase()) 
              || 
              group.list.some(cat => cat.title.toLowerCase().includes(query.toLowerCase()))
            ){
              return (
                <Group
                  key={group.initial}
                  query={query}
                  initial={group.initial}
                  list={group.list}
                  setPreview={setPreview}
                />
              )
            }
            
            return;
            })}
        </Column>
        <Column>
          {locationData.slice(12, locationData.length).map(group => {
            if(
              group.initial.toLowerCase().includes(query.toLowerCase()) 
              || 
              group.list.some(cat => cat.title.toLowerCase().includes(query.toLowerCase()))
            ){
              return (
                <Group
                  key={group.initial}
                  query={query}
                  initial={group.initial}
                  list={group.list}
                  setPreview={setPreview}
                />
              )
            }
            
            return;
            })}
        </Column>
      </React.Fragment>
      )}
      <AnimatePresence>
        {preview.title && (
          <Preview 
            as={motion.div}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <PreviewHeader onClick={hidePreview}>
              <KeyboardBackspaceOutlinedIcon />
              <p>{preview.title}</p>
            </PreviewHeader>
            <PreviewItemList>
              {preview.list.map((item, i) => (
                <PreviewItem key={i} onClick={() => setLocation({state: preview.title, lga: item})}>{item}</PreviewItem>
              ))}
            </PreviewItemList>
          </Preview>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default Grid

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem; 
  padding: 0 1rem 2rem;
  /* flex: 1; */
  overflow-y: auto;

  @media(max-width: 1024px){
    grid-template-columns: 1fr;
    padding-bottom: 7rem;
    padding-top: 1rem;
  }
`

const Column = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: column;
  gap: 5px; */
`

const Preview = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media(min-width: 1024px) {
    max-width: 306px;
  }
`

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  :hover {
    color: #6C8EA0;
  }
`

const PreviewItemList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
  padding: 0.5rem 0;

  @media(min-width: 1024px) {
    border-radius: 10px;
    overflow-x: hidden;
  }
`

const PreviewItem = styled.button`
  color: black;
  height: 40px;
  background-color: white;
  border: none;
  text-align: left;
  padding: 0 0.7rem !important;

  :hover {
    color: #6C8EA0;
  }

  @media(min-width: 1024px) {
    font-size: 1rem;
  }
`