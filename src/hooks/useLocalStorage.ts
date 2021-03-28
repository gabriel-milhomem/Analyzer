import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, typeof setLocalValue] {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalValue = (localValue: T): void => {
    setValue(localValue);

    localStorage.setItem(key, JSON.stringify(localValue));
  };

  return [value, setLocalValue];
}
