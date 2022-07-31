import React, { useRef } from "react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";

const MessageData = ({ data }: { data: Record<string, unknown> }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleScrollPre: React.UIEventHandler<HTMLPreElement> = (e) => {
    const top = e.currentTarget.scrollTop;
    if (ref.current) ref.current.style.marginTop = -1 * top + "px";
  };

  return (
    <div className="h-full flex overflow-hidden">
      <div
        ref={ref}
        className="min-w-[28px] flex flex-col border-r border-[#cbcdd1] dark:border-[#4a4c50]  text-[#757575] dark:text-[#8a8a8a]"
      >
        {JSON.stringify(data, null, 2)
          .split("\n")
          .map((_, index) => {
            return (
              <span key={index} className="px-0.5 text-end">
                {index}
              </span>
            );
          })}
      </div>
      <ReadonlyPre
        className="w-full overflow-auto"
        object={data}
        onScroll={handleScrollPre}
      ></ReadonlyPre>
    </div>
  );
};

export default MessageData;
