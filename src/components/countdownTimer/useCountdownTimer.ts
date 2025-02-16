import { useEffect, useState } from 'react';

export const useCountdownTimer = ({ initialSeconds = 15 }) => {

  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return {
    seconds,
    setSeconds,
  };
};
