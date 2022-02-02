import React, { useEffect, useRef } from "react";

export default function useClickOutside<T extends HTMLElement>(
  onClickOutside: (event: MouseEvent) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        onClickOutside && onClickOutside(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return ref;
}
