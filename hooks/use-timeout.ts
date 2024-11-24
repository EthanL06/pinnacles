import { useState, useEffect } from "react";

const useTimeout = (callback: () => void, delay: number) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        callback();
        setActive(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [active, callback, delay]);

  const start = () => setActive(true);
  const stop = () => setActive(false);

  return { start, stop, active };
};

export default useTimeout;
