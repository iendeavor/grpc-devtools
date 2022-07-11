import { FilterInMemoryDataSource } from "@/data-sources/filter-in-memory-data-source";
import { Filter } from "@/entities/filter";
import { resolve, Tokens } from "@/service-locator";
import { Observable } from "rxjs";

export class FilterRepo {
  private filterInMemoryDataSource: FilterInMemoryDataSource;

  constructor(
    filterInMemoryDataSource = resolve(Tokens.FilterInMemoryDataSource)
  ) {
    this.filterInMemoryDataSource = filterInMemoryDataSource;
  }

  get = (): Filter => {
    return this.filterInMemoryDataSource.get();
  };

  patch = (filter: Partial<Filter>): void => {
    this.filterInMemoryDataSource.patch(filter);
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Filter>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    return this.filterInMemoryDataSource.subscribe(subscriber);
  };
}
