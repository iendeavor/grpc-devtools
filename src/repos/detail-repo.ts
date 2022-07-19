import { DetailInMemoryDataSource } from "@/data-sources/detail-in-memory-data-source";
import { Detail } from "@/entities/detail";
import { resolve, Tokens } from "@/service-locator";
import { Observable } from "rxjs";

export class DetailRepo {
  private detailInMemoryDataSource: DetailInMemoryDataSource;

  constructor(
    detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource)
  ) {
    this.detailInMemoryDataSource = detailInMemoryDataSource;
  }

  get = (): Detail => {
    return this.detailInMemoryDataSource.get();
  };

  patch = (detail: Partial<Detail>): void => {
    this.detailInMemoryDataSource.patch(detail);
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Detail>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    return this.detailInMemoryDataSource.subscribe(subscriber);
  };
}
