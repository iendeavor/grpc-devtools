import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useRef, useState } from "react";
import IconClear from "./input/IconClear";

const Input = () => {
  const filterInMemoryDataSource = resolve(Tokens.FilterInMemoryDataSource);

  const [text, setText] = useState("");
  useEffect(() => {
    filterInMemoryDataSource.patch({
      text,
    });
  }, [text]);
  const [hasText, setHasText] = useState(false);
  useEffect(() => {
    return filterInMemoryDataSource.subscribe((filter) => {
      setText(filter.text);
      setHasText(filter.text.length > 0);
    }).unsubscribe;
  }, []);
  const handleClear = () => {
    filterInMemoryDataSource.patch({
      text: "",
    });
    inputRef.current?.focus();
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div
      className={
        "flex items-center w-32 border bg-background transition-colors text-xs pl-1" +
        (hasText || hasFocus
          ? " border-primary-variant"
          : " border-[transparent] hover:border-text-secondary/50")
      }
    >
      <input
        ref={inputRef}
        className="w-full text-text-primary bg-background py-[1px]"
        placeholder={"Filter"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      ></input>

      {hasText ? (
        <IconClear onClear={handleClear}></IconClear>
      ) : (
        <div className="flex pl-4"></div>
      )}
    </div>
  );
};

export default Input;
