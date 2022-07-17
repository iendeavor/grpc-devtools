import React from "react";

const IconClear = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      className="flex justify-center items-center w-[12px] h-[12px] m-[6px] rounded-full hover:bg-text-error cursor-default"
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
