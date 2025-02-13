import { useRef, useCallback } from 'react';

const useDebounce = <TParams extends unknown[]>(
  func: (...args: TParams) => void,
  timeout: number = 300,
) => {
  const timerId = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: TParams) => {
      const _timerId = timerId.current;
      if (_timerId) clearTimeout(_timerId);

      timerId.current = setTimeout(() => func(...args), timeout);
    },
    [func, timeout],
  );
};

export default useDebounce;
