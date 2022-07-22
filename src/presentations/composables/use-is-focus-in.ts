import React, { useEffect, useState } from "react";

const useIsFocusIn = (ref: React.RefObject<HTMLElement>) => {
  const [isFocusIn, setIsFocusIn] = useState(document.hasFocus());
  useEffect(() => {
    const handleFocus = () => {
      setIsFocusIn(true);
    };
    const handleBlur = () => {
      setIsFocusIn(false);
    };
    ref.current?.addEventListener("focusin", handleFocus);
    ref.current?.addEventListener("focusout", handleBlur);
    return () => {
      ref.current?.removeEventListener("focusin", handleFocus);
      ref.current?.removeEventListener("focusout", handleBlur);
    };
  }, [ref]);

  return isFocusIn;
};

export default useIsFocusIn;
