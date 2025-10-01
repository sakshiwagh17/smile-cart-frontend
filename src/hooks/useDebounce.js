import { useState, useEffect } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  //UseEffect hook to implement the debouncing effect
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    //to cancel the previous timer if the value changes before the timer escape
    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
