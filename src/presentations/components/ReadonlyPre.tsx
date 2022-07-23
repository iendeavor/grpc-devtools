import React, { useEffect, useRef } from "react";

const ReadonlyPre = ({
  object,
  className,
}: {
  object: any;
  className?: React.HTMLAttributes<HTMLPreElement>["className"];
}) => {
  const noop = (e: any) => {
    if (e.metaKey) return;
    if (e.shiftKey) return;
    if (e.altKey) return;
    if (e.ctrlKey) return;
    if (e.key === "ArrowUp") return;
    if (e.key === "ArrowRight") return;
    if (e.key === "ArrowDown") return;
    if (e.key === "ArrowLeft") return;
    e.preventDefault();
    return false;
  };

  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.innerText = JSON.stringify(object, null, 2);
  }, [object]);

  return (
    <pre
      className={className}
      ref={ref}
      contentEditable
      onCut={noop}
      onPaste={noop}
      onKeyDown={noop}
    ></pre>
  );
};

export default ReadonlyPre;
