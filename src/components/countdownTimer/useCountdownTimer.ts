import { useEffect, useRef, useState } from 'react';

interface UseCountdownTimerProps {
  initialSeconds?: number;
  onTimeEnd?: () => void;
}

export const useCountdownTimer = ({ initialSeconds = 180, onTimeEnd }: UseCountdownTimerProps) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasEnded = useRef(false); // Ngăn gọi onTimeEnd nhiều lần

  useEffect(() => {
    //console.log(`⏳ Timer started: ${seconds}s`);

    if (seconds <= 0) {
      //console.log("🚨 Timer reached 0!");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (!hasEnded.current) {
        hasEnded.current = true;
        // console.log("✅ Calling onTimeEnd()");
        onTimeEnd?.();
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [seconds]); // ✅ Cập nhật khi seconds thay đổi

  return { seconds };
};
