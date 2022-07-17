import React from "react";
import Checkbox from "@/presentations/components/Checkbox";
import useFilter from "@/presentations/composables/use-filter";
import { Filter } from "@/entities/filter";

const Invert = () => {
  const [filter, setFilter] = useFilter();
  const setInvert = (invert: Filter["invert"]) => {
    setFilter({
      ...filter,
      invert: invert,
    });
  };

  return (
    <div className="flex items-center h-[24px]">
      <Checkbox
        checked={filter.invert}
        onChange={(e) => setInvert(e.target.checked)}
      >
        <span>Invert</span>
      </Checkbox>
    </div>
  );
};

export default Invert;
