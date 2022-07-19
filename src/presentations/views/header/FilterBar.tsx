import React from "react";
import Input from "./filter-bar/Input";
import Invert from "./filter-bar/Invert";
import MatchCase from "./filter-bar/MatchCase";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center px-1 select-none">
      <Input></Input>
      <div className="mr-2"></div>
      <Invert></Invert>
      <div className="mr-2"></div>
      <MatchCase></MatchCase>
    </div>
  );
};

export default FilterBar;
