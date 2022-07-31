import { Filter } from "@/entities/filter";
import useFilter from "@/presentations/composables/use-filter";
import React, { useMemo, useRef, useState } from "react";
import IconClear from "./input/IconClear";

const Input = () => {
  const [filter, setFilter] = useFilter();
  const handleChange = (text: Filter["text"]) => {
    setFilter({
      ...filter,
      text: text,
    });
  };
  const handleClear = () => {
    setFilter({
      ...filter,
      text: "",
    });
    inputRef.current?.focus();
  };

  const isFiltering = useMemo(() => {
    return filter.text.length > 0;
  }, [filter]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div
      className={
        "flex items-center w-32 border bg-[#ffffff] dark:bg-[#202124] transition-colors pl-1" +
        (isFiltering || hasFocus
          ? " border-[#1b73e8] dark:border-[#10629d]"
          : " border-[transparent] hover:border-[#e0e0e0] dark:hover:border-[#5a5a5a]")
      }
    >
      <input
        ref={inputRef}
        className="w-full text-[#303942] dark:text-[#bbc3cc] placeholder:text-[#5f6367] dark:placeholder:text-[#9aa0a6] bg-[#ffffff] dark:bg-[#202124] py-[1px]"
        placeholder={"Filter"}
        value={filter.text}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      ></input>

      {isFiltering ? (
        <IconClear onClear={handleClear}></IconClear>
      ) : (
        <div className="flex pl-4"></div>
      )}
    </div>
  );
};

export default Input;
