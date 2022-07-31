import React, { useState } from "react";

const Download = () => {
  const [isHovering, setIsHovering] = useState(false);

  const download = () => void 0;

  return (
    <button
      className="flex items-center h-[26px] px-1 -mr-1 cursor-default focus-visible:bg-[#dfe1e5] dark:focus-visible:bg-[#35363a]"
      onClick={download}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-rounded font-bold scale-[0.7] transition-colors" +
          (isHovering
            ? " text-[#202124] dark:text-[#e8eaed]"
            : " text-[#6e6e6e] dark:text-[#919191]")
        }
      >
        file_download
      </div>
    </button>
  );
};

export default Download;
