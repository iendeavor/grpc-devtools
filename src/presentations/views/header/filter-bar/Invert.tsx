import React, { useState, useEffect } from "react";
import Checkbox from "@/presentations/components/Checkbox";
import { resolve, Tokens } from "@/service-locator";

const Invert = () => {
  const filterInMemoryDataSource = resolve(Tokens.FilterInMemoryDataSource);

  const [invert, setInvert] = useState(filterInMemoryDataSource.get().invert);
  useEffect(() => {
    return filterInMemoryDataSource.subscribe((filter) => {
      setInvert(filter.invert);
    }).unsubscribe;
  }, []);
  useEffect(() => {
    filterInMemoryDataSource.patch({
      invert,
    });
  }, [invert]);

  return (
    <div className="flex items-center h-[24px]">
      <Checkbox checked={invert} onChange={(e) => setInvert(e.target.checked)}>
        <span>Invert</span>
      </Checkbox>
    </div>
  );
};

export default Invert;
