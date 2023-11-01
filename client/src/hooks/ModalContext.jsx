import { createContext } from 'react'

export const ModalContext = createContext({
  modalData: [],
  display: false,
  setModalData: () => {},
  setDisplay: () => {}
})