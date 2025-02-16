import { useEffect, useState } from 'react';

export const useCountupTimer = () => {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    seconds,
    setSeconds,
  };
};
