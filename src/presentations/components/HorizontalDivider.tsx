import React from "react";

const HorizontalDivider = ({
  className,
}: {
  className?: React.HTMLAttributes<HTMLHRElement>["className"];
}) => {
  return (
    <hr
      className={
        "border-[#cbcdd1] dark:border-[#4a4c50] h-[1px]" + " " + className
      }
    ></hr>
  );
};

export default HorizontalDivider;
