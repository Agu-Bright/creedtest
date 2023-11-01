import React, { createContext, useReducer } from 'react'

export const AdminNavContext = createContext();

const initialState = {
  hideAll: false,
  hideBottomTab: false,
  hideTopTab: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'HIDE_ALL':
      return { ...state, hideAll: true };
    case 'SHOW_ALL':
      return { ...state, hideAll: false, hideBottomTab: false, hideTopTab: false };
    case 'SHOW_BOTTOM_TAB':
      return { ...state, hideBottomTab: false };
    case 'SHOW_BOTTOM_TAB_ONLY':
      return { ...state, hideAll: false, hideTopTab: true, hideBottomTab: false };
    case 'HIDE_BOTTOM_TAB':
      return { ...state, hideBottomTab: true };
    case 'SHOW_TOP_TAB':
      return { ...state, hideTopTab: false };
    case 'HIDE_TOP_TAB':
      return { ...state, hideTopTab: true };
    default:
      return state;
  }
};

const AdminNavProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminNavContext.Provider value={{state, dispatch}}>
      {children}
    </AdminNavContext.Provider>
  )
}

export default AdminNavProvider