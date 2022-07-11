import { Filter } from "@/entities/filter";
import { Observable, Subscriber } from "rxjs";
import { produce } from "immer";

export class FilterInMemoryDataSource {
  private subscribers: Subscriber<Filter>[] = [];

  private filter: Filter = {
    invert: false,
    text: "",
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Filter>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    const observable = new Observable<Filter>((subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
      };
    });
    return observable.subscribe(subscriber);
  };

  get = (): Filter => {
    return this.filter;
  };

  patch = (filter: Partial<Filter>): void => {
    this.filter = produce(this.filter, (draft) => {
      if (filter.invert !== undefined) draft.invert = filter.invert;

      if (filter.text !== undefined) draft.text = filter.text;
    });

    this.subscribers.forEach((subscriber) => subscriber.next(this.filter));
  };
}
