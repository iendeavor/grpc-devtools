import React from "react";

const IconClear = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      className="flex justify-center items-center w-[12px] h-[12px] m-[6px] rounded-full text-[#676767] dark:text-[#676767] hover:text-[#ffffff] dark:hover:text-[#ffffff] hover:bg-[#e59390] dark:hover:bg-[#e59390] cursor-default"
      onClick={onClear}
    >
      <span className={"material-symbols-outlined scale-[0.6]"}>close</span>
    </button>
  );
};

export default IconClear;
