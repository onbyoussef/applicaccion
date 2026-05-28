import { useEffect, useState } from 'react';

const getNextMidnight = (now = new Date()) => {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next;
};

export const useMidnightTicker = () => {
  const [todayKey, setTodayKey] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const schedule = () => {
      const now = new Date();
      const nextMidnight = getNextMidnight(now);
      const msUntilMidnight = Math.max(0, nextMidnight.getTime() - now.getTime() + 50);

      timeoutId = window.setTimeout(() => {
        setTodayKey(new Date().toISOString().slice(0, 10));
        intervalId = window.setInterval(() => {
          setTodayKey(new Date().toISOString().slice(0, 10));
        }, 24 * 60 * 60 * 1000);
      }, msUntilMidnight);
    };

    schedule();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return todayKey;
};

