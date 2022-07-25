import { RequestRowsInMemoryDataSource } from "@/data-sources/request-rows-in-memory-data-source";
import { RequestRowsLocalDataSource } from "@/data-sources/request-rows-local-data-source";
import { RequestRow } from "@/entities/request-row";
import { resolve, Tokens } from "@/service-locator";
import { Observable } from "rxjs";

export class RequestRowsRepo {
  private requestRowsInMemoryDataSource: RequestRowsInMemoryDataSource;
  private requestRowsLocalDataSource: RequestRowsLocalDataSource;

  constructor(
    requestRowsInMemoryDataSource = resolve(
      Tokens.RequestRowsInMemoryDataSource
    ),
    requestRowsLocalDataSource = resolve(Tokens.RequestRowsLocalDataSource)
  ) {
    this.requestRowsInMemoryDataSource = requestRowsInMemoryDataSource;
    this.requestRowsLocalDataSource = requestRowsLocalDataSource;
  }

  hydrate = (): void => {
    this.requestRowsInMemoryDataSource.deleteAll();

    const persistedRequestRows = this.requestRowsLocalDataSource.getAll();
    persistedRequestRows.forEach((requestRow) => {
      this.requestRowsInMemoryDataSource.postOrPut(requestRow);
    });
  };

  persist = (): void => {
    const requestRows = this.requestRowsInMemoryDataSource.getAll();
    this.requestRowsLocalDataSource.deleteAll();
    this.requestRowsLocalDataSource.putAll(requestRows);
  };

  getAll = (): RequestRow[] => {
    return this.requestRowsInMemoryDataSource.getAll();
  };

  postOrPutMultiple = ({
    requestRows,
  }: {
    requestRows: RequestRow[];
  }): void => {
    requestRows
      .filter((requestRow) => {
        const isNewRequest = !!requestRow.methodName;
        if (isNewRequest) return true;

        const cachedRequestRow = this.requestRowsInMemoryDataSource.get({
          id: requestRow.id,
        });
        const isRequestStillExists = !!cachedRequestRow;
        if (isRequestStillExists) return true;

        return false;
      })
      .forEach((requestRow) =>
        this.requestRowsInMemoryDataSource.postOrPut(requestRow)
      );

    this.persist();
  };

  deleteAll = (): void => {
    this.requestRowsInMemoryDataSource.deleteAll();
    this.requestRowsLocalDataSource.deleteAll();

    this.persist();
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<RequestRow[]>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    return this.requestRowsInMemoryDataSource.subscribe(subscriber);
  };
}
