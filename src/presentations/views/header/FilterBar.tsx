import React from "react";
import Input from "./filter-bar/Input";
import Invert from "./filter-bar/Invert";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center px-1 select-none">
      <Input></Input>
      <div className="mr-2"></div>
      <Invert></Invert>
    </div>
  );
};

export default FilterBar;
