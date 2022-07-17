import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useMemo, useState } from "react";
import useFilter from "@/presentations/composables/use-filter";

const IconFilter = () => {
  const filterRepo = resolve(Tokens.FilterRepo);

  const [isHovering, setIsHovering] = useState(false);

  const [shouldOpenFilterBar, setShouldOpenFilterBar] = useState(true);
  useEffect(() => {
    filterRepo.patch({});
  }, [shouldOpenFilterBar]);

  const [filter] = useFilter();
  const isFiltering = useMemo(() => {
    return filter.text.length > 0;
  }, [filter]);

  return (
    <button
      className="flex items-center h-[26px] px-1 -ml-1 cursor-default focus-visible:bg-background-elevation-2"
      onClick={() => setShouldOpenFilterBar(!shouldOpenFilterBar)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-rounded font-bold scale-[0.7] transition-colors" +
          (isFiltering
            ? " text-text-error"
            : shouldOpenFilterBar
            ? " text-primary"
            : isHovering
            ? " text-text-primary"
            : " text-text-secondary")
        }
      >
        filter_alt
      </div>
    </button>
  );
};

export default IconFilter;
