import { useEffect, useRef } from "react";

const useAutoScroll = (dependency) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [dependency]);

  return containerRef;
};

export default useAutoScroll;