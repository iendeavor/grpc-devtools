import { RequestRowsInMemoryDataSource } from "@/data-sources/request-rows-in-memory-data-source";
import { SafeSubscriber } from "rxjs/internal/Subscriber";

describe("getAll", () => {
  it("should return all data", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ];

    const result = dataSource.getAll();

    expect(result).toEqual([
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ]);
  });
});

describe("post", () => {
  it("should be able to post new data", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <any>[];
    dataSource["requestRows"] = requestRows;

    dataSource.post({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });

    expect(requestRows).toEqual([]);
    expect(dataSource["requestRows"]).toEqual([
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ]);
  });

  it("should call callSubscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["callSubscribers"] = jest.fn();

    dataSource.post({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });

    expect(dataSource["callSubscribers"]).toBeCalled();
  });
});

describe("put", () => {
  it("should be able to put data", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <any>[
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ];
    dataSource["requestRows"] = requestRows;

    dataSource.put({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
      responseMessage: {
        id: 1,
      },
    });

    expect(requestRows).toEqual([
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ]);
    expect(dataSource["requestRows"]).toEqual([
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
        responseMessage: {
          id: 1,
        },
      },
    ]);
  });

  it("should call callSubscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ];
    dataSource["callSubscribers"] = jest.fn();

    dataSource.put({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });

    expect(dataSource["callSubscribers"]).toBeCalled();
  });
});

describe("postOrPut", () => {
  it("should call post", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <any>[];
    dataSource["requestRows"] = requestRows;
    dataSource.post = jest.fn();
    dataSource.put = jest.fn();

    dataSource.postOrPut({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });

    expect(dataSource.post).toBeCalledWith({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });
    expect(dataSource.put).not.toBeCalled();
  });

  it("should call put", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ];
    dataSource.post = jest.fn();
    dataSource.put = jest.fn();

    dataSource.postOrPut({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });

    expect(dataSource.post).not.toBeCalled();
    expect(dataSource.put).toBeCalledWith({
      id: "1",
      type: "unary",
      methodName: "/users",
      requestMessage: {
        name: "john",
      },
    });
  });
});

describe("deleteAll", () => {
  it("should be able to delete all", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <any>[
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ];
    dataSource["requestRows"] = requestRows;

    dataSource.deleteAll();

    expect(requestRows).toEqual([
      {
        id: "1",
        type: "unary",
        methodName: "/users",
        requestMessage: {
          name: "john",
        },
      },
    ]);
    expect(dataSource["requestRows"]).toEqual([]);
  });

  it("should call callSubscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["callSubscribers"] = jest.fn();

    dataSource.deleteAll();

    expect(dataSource["callSubscribers"]).toBeCalled();
  });
});

describe("callSubscribers", () => {
  it("should call subscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const subscribers = [{ next: jest.fn() } as any];
    dataSource["subscribers"] = subscribers;

    dataSource["callSubscribers"]();

    subscribers.every((subscriber) => expect(subscriber.next).toBeCalled());
  });
});

describe("subscribe", () => {
  it("should be able to subscribe", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const subscriber = jest.fn();

    dataSource.subscribe(subscriber);

    expect(dataSource["subscribers"]).toEqual([expect.any(SafeSubscriber)]);
  });

  it("should be able to unsubscribe", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const subscriber = jest.fn();
    const subscription = dataSource.subscribe(subscriber);

    subscription.unsubscribe();

    expect(dataSource["subscribers"]).toEqual([]);
  });
});
