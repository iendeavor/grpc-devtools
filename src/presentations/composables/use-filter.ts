import { Filter } from "@/entities/filter";
import { resolve, Tokens } from "@/service-locator";
import { useEffect, useState } from "react";

const useFilter = () => {
  const filterRepo = resolve(Tokens.FilterRepo);
  const [filter, setFilter] = useState<Filter>(filterRepo.get());
  useEffect(() => {
    const subscription = filterRepo.subscribe((filter) => {
      setFilter(filter);
    });
    return () => subscription.unsubscribe();
  }, []);

  const setFilter2 = (filter: Filter) => {
    filterRepo.patch(filter);
  };

  return [filter, setFilter2] as const;
};

export default useFilter;
