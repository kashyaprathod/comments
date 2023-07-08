import React, { useEffect, useState } from "react";

const getData = (key, initialValue) => {
  const item = JSON.parse(localStorage.getItem(key));
  console.log(item);
  if (item) {
    console.log("This is executed");
    return item;
  } else {
    if (initialValue instanceof Function) {
      console.log("FUNCTION EXECURED");
      const data = initialValue();
      console.log(data);
      return data;
    } else {
      console.log("INITIAL VALUE ");
      console.log(initialValue);
      return initialValue;
    }
  }
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getData(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
