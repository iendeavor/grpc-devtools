import { Detail } from "@/entities/detail";
import { Observable, Subscriber } from "rxjs";
import { produce } from "immer";

export class DetailInMemoryDataSource {
  private subscribers: Subscriber<Detail>[] = [];

  private detail: Detail = {
    requestId: null,
    currentTab: "headers",
    headers: {
      focusIndex: 0,
    },
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Detail>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    const observable = new Observable<Detail>((subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
      };
    });
    return observable.subscribe(subscriber);
  };

  get = (): Detail => {
    return this.detail;
  };

  patch = (detail: Partial<Detail>): void => {
    this.detail = produce(this.detail, (draft) => {
      if (detail.currentTab !== undefined) draft.currentTab = detail.currentTab;
      if (detail.headers !== undefined) draft.headers = detail.headers;
      if (detail.requestId !== undefined) draft.requestId = detail.requestId;
    });

    this.subscribers.forEach((subscriber) => subscriber.next(this.detail));
  };
}
