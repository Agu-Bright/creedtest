import React, { createContext, useReducer } from "react";

export const LocationContext = createContext();

const initialState = {
  location: ''
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_LOCATION':
      return {...state, location: action.payload};
    case 'CLEAR_LOCATION':
      return {...state, location: ''};
    default:
      return state;
  }
}

const LocationProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={{state, dispatch}}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider