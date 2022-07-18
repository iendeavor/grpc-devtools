import { RequestRowsChromeDevtoolsDataSource } from "@/data-sources/request-rows-remote-data-source";
import { SafeSubscriber } from "rxjs/internal/Subscriber";

describe("onPost", () => {
  it("should be able to subscribe", () => {
    const dataSource = new RequestRowsChromeDevtoolsDataSource();
    const subscribers = <any>[];
    dataSource["subscribers"] = subscribers;
    const subscriber = jest.fn();

    dataSource.subscribe(subscriber);

    expect(subscribers).toEqual([]);
    expect(dataSource["subscribers"]).toEqual([expect.any(SafeSubscriber)]);
  });

  it("should be able to unsubscribe", () => {
    const dataSource = new RequestRowsChromeDevtoolsDataSource();
    const subscriber = jest.fn();
    const subscription = dataSource.subscribe(subscriber);

    subscription.unsubscribe();

    expect(dataSource["subscribers"]).toEqual([]);
  });
});
