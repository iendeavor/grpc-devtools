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
        "flex items-center w-32 border bg-background transition-colors text-xs pl-1" +
        (isFiltering || hasFocus
          ? " border-[#10629d]"
          : " border-[transparent] hover:border-text-secondary/50")
      }
    >
      <input
        ref={inputRef}
        className="w-full text-[#bbc3cc] placeholder:text-[#9aa0a6] bg-background py-[1px]"
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
