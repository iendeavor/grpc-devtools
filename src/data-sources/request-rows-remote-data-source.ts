import { RequestRow } from "@/entities/request-row";
import produce from "immer";
import { Observable, Subscriber } from "rxjs";

export class RequestRowsChromeDevtoolsDataSource {
  private subscribers: Subscriber<RequestRow[]>[] = [];

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<RequestRow[]>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    const observable = new Observable<RequestRow[]>((subscriber) => {
      this.subscribers = produce(this.subscribers, (draft) => {
        draft.push(subscriber);
      });
      return () => {
        this.subscribers = produce(this.subscribers, (draft) => {
          return draft.filter((s) => s !== subscriber);
        });
      };
    });
    return observable.subscribe(subscriber);
  };
}
