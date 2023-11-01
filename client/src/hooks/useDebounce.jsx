import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay=300) => {
  // state and setter for debounce value
  const [state, setState] = useState(value);

  useEffect(() => {
    // change value after delay
    const timerId = setTimeout(() => setState(value), delay);

    // cancel the timer when value 0r delay changes (unmount)
    return () => clearTimeout(timerId);
  }, [
    value,
    delay
  ])

  return state;
}

export default useDebounce