import { RequestRow } from "@/entities/request-row";
import { Observable, Subscriber } from "rxjs";

export class RequestRowsInMemoryDataSource {
  private requestRows: RequestRow[] = [];
  private subscribers: Subscriber<RequestRow[]>[] = [];

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<RequestRow[]>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    const observable = new Observable<RequestRow[]>((subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
      };
    });
    return observable.subscribe(subscriber);
  };

  getAll = (): RequestRow[] => {
    return this.requestRows;
  };

  get = (param: { id: RequestRow["id"] }): null | RequestRow => {
    return this.requestRows.find(({ id }) => id === param.id) ?? null;
  };

  post = (requestRow: RequestRow): void => {
    this.requestRows = this.requestRows.concat(requestRow);
    this.callSubscribers();
  };

  put = (requestRow: RequestRow): void => {
    const index = this.requestRows.findIndex(({ id }) => id === requestRow.id);
    this.requestRows = [...this.requestRows];
    this.requestRows[index] = requestRow;
    this.callSubscribers();
  };

  postOrPut = (requestRow: RequestRow): void => {
    if (this.requestRows.some(({ id }) => id === requestRow.id)) {
      this.put(requestRow);
    } else {
      this.post(requestRow);
    }
  };

  deleteAll = (): void => {
    this.requestRows = [];
    this.callSubscribers();
  };

  private callSubscribers() {
    this.subscribers.forEach((subscriber) => subscriber.next(this.requestRows));
  }
}
