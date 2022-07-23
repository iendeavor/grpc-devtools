import { resolve, Tokens } from "@/service-locator";
import React, { useState } from "react";

const IconClear = () => {
  const [isHovering, setIsHovering] = useState(false);

  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  const handleClear = () => {
    requestRowsRepo.deleteAll();
  };

  return (
    <button
      className="flex items-center h-[26px] px-1 -mr-1 focus-visible:bg-[#35363a] cursor-default"
      onClick={handleClear}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "relative flex justify-center items-center rounded-full w-[13px] h-[13px] m-[2px] border-gray-500 border-[2px] transition-colors" +
          (isHovering ? " border-text-primary" : "")
        }
      >
        <div
          className={
            "absolute w-[13px] h-[2px] rotate-45 transition-colors" +
            (isHovering ? " bg-[#e8eaed]" : " bg-[#919191]")
          }
        ></div>
      </div>
    </button>
  );
};

export default IconClear;
