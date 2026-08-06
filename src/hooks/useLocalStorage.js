import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function
          ? value(storedValue)
          : value;

      setStoredValue(valueToStore);

      localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;