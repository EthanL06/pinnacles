import { useEffect, useRef } from "react";

/**
 * A custom hook that debounces a callback function.
 *
 * @param callback - The function to debounce.
 * @param delay - The delay in milliseconds for the debounce.
 * @returns A debounced version of the callback function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};

export default useDebounce;
