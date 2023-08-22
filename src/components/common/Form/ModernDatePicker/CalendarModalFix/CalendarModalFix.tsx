import { useEffect, useRef, useState } from "react";

export const useFixModal = (initialIsVisible = 1) => {
  const [zIndex, setZIndex] = useState(initialIsVisible);
  const ref = useRef<any>(0);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setZIndex(0);
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setZIndex(0);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, zIndex, setZIndex };
};
