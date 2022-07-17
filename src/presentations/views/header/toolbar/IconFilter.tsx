import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useMemo, useState } from "react";
import useFilter from "@/presentations/composables/use-filter";
import { Config } from "@/entities/config";

const IconFilter = () => {
  const [isHovering, setIsHovering] = useState(false);

  const configRepo = resolve(Tokens.ConfigRepo);
  const [config, setConfig] = useState(configRepo.get());
  useEffect(() => {
    const subscription = configRepo.subscribe((config) => {
      setConfig(config);
    });
    return () => subscription.unsubscribe();
  }, []);
  const setShouldShowFilterBar = (
    shouldShowFilterBar: Config["shouldShowFilterBar"]
  ) => {
    configRepo.patch({
      ...config,
      shouldShowFilterBar: shouldShowFilterBar,
    });
  };

  const [filter] = useFilter();
  const isFiltering = useMemo(() => {
    return filter.text.length > 0;
  }, [filter]);

  return (
    <button
      className="flex items-center h-[26px] px-1 -ml-1 cursor-default focus-visible:bg-background-elevation-2"
      onClick={() => setShouldShowFilterBar(!config.shouldShowFilterBar)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "flex justify-center items-center w-[13px] h-[13px] m-[2px] material-symbols-rounded font-bold scale-[0.7] transition-colors" +
          (isFiltering
            ? " text-text-error"
            : config.shouldShowFilterBar
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
