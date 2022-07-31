import React from "react";

const IconClear = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      className="flex justify-center items-center w-[12px] h-[12px] m-[2px] rounded-full text-[#ffffff] dark:text-[#bcbcbd] bg-[#bcbcbc] dark:bg-[#79797a] hover:bg-[#a0a0a0] dark:hover:bg-[#9d9d9d]"
      onClick={onClear}
    >
      <span
        className={
          "material-symbols-outlined scale-[0.6] hover:text-[#ffffff] dark:hover:text-[#fcfcfc]"
        }
      >
        close
      </span>
    </button>
  );
};

export default IconClear;
