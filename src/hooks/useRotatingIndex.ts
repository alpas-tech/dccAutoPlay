import { useEffect, useState } from 'react';

export default function useRotatingIndex(items: any[], intervalTime = 5000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items, intervalTime]);

  // Reset index if items change
  useEffect(() => {
    setIndex(0);
  }, [items]);

  return index;
}
