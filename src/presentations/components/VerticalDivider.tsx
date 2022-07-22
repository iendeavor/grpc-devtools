import React from "react";

const VerticalDivider = ({
  className,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
} = {}) => {
  return (
    <div className={"w-[1px] bg-[#4a4c50] leading-5 " + (className ?? "")}>
      &nbsp;
    </div>
  );
};

export default VerticalDivider;
