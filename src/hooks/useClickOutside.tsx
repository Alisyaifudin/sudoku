import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickOutside<T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  callback: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside<K extends HTMLElement>(event: Event) {
      if (ref?.current && !ref.current.contains(event.target as K)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
export default useClickOutside;
