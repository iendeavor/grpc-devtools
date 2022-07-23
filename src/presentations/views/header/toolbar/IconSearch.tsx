import React, { useState } from "react";

const IconSearch = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldOpenSearchSidebar, setShouldOpenSearchSidebar] = useState(false);

  return (
    <button
      className="flex items-center h-[26px] px-1 -mr-1 cursor-default focus-visible:bg-[#35363a]"
      onClick={() => setShouldOpenSearchSidebar(!shouldOpenSearchSidebar)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-outlined font-bold scale-[0.7] text-text-secondary transition-colors" +
          (isHovering ? " text-text-primary" : "")
        }
      >
        search
      </div>
    </button>
  );
};

export default IconSearch;
