import { Config } from "@/entities/config";
import { Observable, Subscriber } from "rxjs";
import { produce } from "immer";

export class ConfigInMemoryDataSource {
  private subscribers: Subscriber<Config>[] = [];

  private config: Config = {
    shouldPreserveLog: false,
    shouldRecord: true,
  };

  subscribe = (
    subscriber: Exclude<
      Parameters<Observable<Config>["subscribe"]>["0"],
      null | undefined
    >
  ) => {
    const observable = new Observable<Config>((subscriber) => {
      this.subscribers.push(subscriber);
      return () => {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
      };
    });
    return observable.subscribe(subscriber);
  };

  get = (): Config => {
    return this.config;
  };

  patch = (config: Partial<Config>): void => {
    this.config = produce(this.config, (draft) => {
      if (config.shouldPreserveLog !== undefined)
        draft.shouldPreserveLog = config.shouldPreserveLog;

      if (config.shouldRecord !== undefined)
        draft.shouldRecord = config.shouldRecord;
    });

    this.subscribers.forEach((subscriber) => subscriber.next(this.config));
  };
}
