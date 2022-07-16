import React, { useEffect, useRef } from "react";

const ReadonlyPre = ({ object }: { object: any }) => {
  const noop = (e: any) => {
    if (e.metaKey) return;
    e.preventDefault();
    return false;
  };

  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.innerText = JSON.stringify(object, null, 2);
  }, [object]);

  return (
    <pre
      ref={ref}
      contentEditable
      onCut={noop}
      onPaste={noop}
      onKeyDown={noop}
    ></pre>
  );
};

export default ReadonlyPre;
