import { useEffect, useRef } from 'react';

export const useInterval = (cb: () => void, interval: number) => {
  const cbRef = useRef(() => {});

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    const timeout = setInterval(cbRef.current, interval);
    return () => clearInterval(timeout);
  }, [interval]);
};
