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
        className="flex items-center text-xs text-secondary hover:text-text-primary"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={
            "flex items-center justify-center w-3 h-3 mr-[6px] rounded-sm border p-0 bg-background-elevation-2 transition-colors" +
            (isHovering ? " border-text-primary" : " border-secondary")
          }
        >
          <input
            checked={checked}
            onChange={onChange}
            type="checkbox"
            className={checked ? "accent-[rgb(255_165_0)]" : "appearance-none"}
          ></input>
        </div>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
