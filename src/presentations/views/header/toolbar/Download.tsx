import React, { useState } from "react";

const Download = () => {
  const [isHovering, setIsHovering] = useState(false);

  const download = () => void 0;

  return (
    <button
      className="flex items-center h-[26px] px-1 -mr-1 cursor-default focus-visible:bg-background-elevation-2"
      onClick={download}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-rounded font-bold scale-[0.7] transition-colors" +
          (isHovering ? " text-text-primary" : " text-text-secondary")
        }
      >
        file_download
      </div>
    </button>
  );
};

export default Download;
