import { useState } from 'react';

export function useLoading(): [boolean, typeof load] {
  const [isLoading, setIsLoading] = useState(false);

  function load(promise: Promise<any>): Promise<any> {
    setIsLoading(true);
    return promise.finally(() => setIsLoading(false));
  }

  return [isLoading, load];
}
