import React, { useState } from "react";

const Checkbox = ({
  checked,
  onChange,
  children,
}: {
  checked: React.InputHTMLAttributes<HTMLInputElement>["checked"];
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  children: JSX.Element;
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <label
        className="flex items-center text-[#9aa0a6] hover:text-[#e8eaed]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={
            "flex items-center justify-center w-3 h-3 mr-[6px] rounded-sm border p-0 bg-[#3b3b3b] transition-colors" +
            (isHovering ? " border-[#acacac]" : " border-[#858585]")
          }
        >
          <input
            checked={checked}
            onChange={onChange}
            type="checkbox"
            className={checked ? "accent-[#ffa500]" : "appearance-none"}
          ></input>
        </div>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
