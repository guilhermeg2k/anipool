import { useEffect } from 'react';

export const useInterval = () => {
  useEffect(() => {
    if (resultsIsNotVisible) {
      const timeout = setInterval(() => {
        const countdown = getCountdownValues(new Date(poll?.endDate || 0));
        setCountdown(countdown);
      }, 1000);
      return () => clearInterval(timeout);
    }
  }, [poll]);
};
