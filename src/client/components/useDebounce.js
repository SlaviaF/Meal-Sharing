import React, { useState, useEffect } from "react";

const useDebounce = (inputValue) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    if (inputValue) {
      const timelag = setTimeout(() => {
        setDebounceValue(inputValue);
      }, 500);

      return () => {
        clearTimeout(timelag);
      };
    }
  }, [inputValue]);

  return debounceValue;
};

export default useDebounce;
