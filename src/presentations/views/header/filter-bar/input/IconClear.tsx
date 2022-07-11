import React from "react";

const IconClear = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      className="flex justify-center items-center w-[12px] h-[12px] m-[2px] rounded-full bg-[rgb(128_134_139)] hover:bg-gray-400 focus:bg-gray-400"
      onClick={onClear}
    >
      <span
        className={"material-symbols-outlined scale-[0.6] text-text-primary"}
      >
        close
      </span>
    </button>
  );
};

export default IconClear;
