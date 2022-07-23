import React, { useState } from "react";

const Upload = () => {
  const [isHovering, setIsHovering] = useState(false);

  const upload = () => void 0;

  return (
    <button
      className="flex items-center h-[26px] px-1 -ml-1 cursor-default focus-visible:bg-[#35363a]"
      onClick={upload}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-rounded font-bold scale-[0.7] transition-colors" +
          (isHovering ? " text-text-primary" : " text-text-secondary")
        }
      >
        file_upload
      </div>
    </button>
  );
};

export default Upload;
