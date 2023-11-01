import React, { useEffect } from 'react'

const useResize = (callback) => {
  useEffect(() => {
    if(callback) { // function to execute
      callback();
      window.addEventListener('resize', () => callback())

      // clean up function
      return () => {
        window.removeEventListener('resize', () => {})
      }
    }
  }, [])
}

export default useResize