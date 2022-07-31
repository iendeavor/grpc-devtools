import React, { useState } from "react";

const IconSearch = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldOpenSearchSidebar, setShouldOpenSearchSidebar] = useState(false);

  return (
    <button
      className="flex items-center h-[26px] px-1 -mr-1 cursor-default focus-visible:bg-[#dfe1e5] dark:focus-visible:bg-[#35363a]"
      onClick={() => setShouldOpenSearchSidebar(!shouldOpenSearchSidebar)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-outlined font-bold scale-[0.7] text-[#6e6e6e] dark:text-[#919191] transition-colors" +
          (isHovering ? " text-[#202124] dark:text-[#e8eaed]" : "")
        }
      >
        search
      </div>
    </button>
  );
};

export default IconSearch;
