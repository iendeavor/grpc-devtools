import React from "react";
import Checkbox from "@/presentations/components/Checkbox";
import useFilter from "@/presentations/composables/use-filter";
import { Filter } from "@/entities/filter";

const MatchCase = () => {
  const [filter, setFilter] = useFilter();
  const setInvert = (caseSensitive: Filter["caseSensitive"]) => {
    setFilter({
      ...filter,
      caseSensitive: caseSensitive,
    });
  };

  return (
    <div className="flex items-center h-[24px]">
      <Checkbox
        checked={filter.caseSensitive}
        onChange={(e) => setInvert(e.target.checked)}
      >
        <span>Match Case</span>
      </Checkbox>
    </div>
  );
};

export default MatchCase;
