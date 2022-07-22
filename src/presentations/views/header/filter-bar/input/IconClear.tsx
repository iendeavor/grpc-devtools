import React from "react";

const IconClear = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      className="flex justify-center items-center w-[12px] h-[12px] m-[2px] rounded-full bg-[#79797a] hover:bg-[#9d9d9d] focus:bg-gray-400"
      onClick={onClear}
    >
      <span
        className={
          "material-symbols-outlined scale-[0.6] text:[#bcbcbd] hover:text-[#fcfcfc]"
        }
      >
        close
      </span>
    </button>
  );
};

export default IconClear;
