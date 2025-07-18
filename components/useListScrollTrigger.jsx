import { useState, useEffect } from "react";

export default function useListScrollTrigger(listRef) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = listRef.current?._outerRef?.scrollTop || 0;
      setTrigger(scrollTop > 100);
    };

    const listElement = listRef.current?._outerRef;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [listRef]);

  return trigger;
}
