import { RequestRowsInMemoryDataSource } from "@/data-sources/request-rows-in-memory-data-source";
import { RequestRow } from "@/entities/request-row";
import { SafeSubscriber } from "rxjs/internal/Subscriber";

describe("getAll", () => {
  it("should return all data", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ];

    const result = dataSource.getAll();

    expect(result).toEqual([
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
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
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
      ],
    });

    expect(requestRows).toEqual([]);
    expect(dataSource["requestRows"]).toEqual([
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ]);
  });

  it("should call callSubscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["callSubscribers"] = jest.fn();

    dataSource.post({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
      ],
    });

    expect(dataSource["callSubscribers"]).toBeCalled();
  });
});

describe("put", () => {
  it("should be able to put data", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <RequestRow[]>[
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ];
    dataSource["requestRows"] = requestRows;

    dataSource.put({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      responseMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
        {
          type: "response",
          data: { id: 1 },
          timestamp: 0,
        },
      ],
    });

    expect(requestRows).toEqual([
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ]);
    expect(dataSource["requestRows"]).toEqual([
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        responseMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
          {
            type: "response",
            data: { id: 1 },
            timestamp: 0,
          },
        ],
      },
    ]);
  });

  it("should call callSubscribers", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ];
    dataSource["callSubscribers"] = jest.fn();

    dataSource.put({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
      ],
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
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
      ],
    });

    expect(dataSource.post).toBeCalledWith({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
      ],
    });
    expect(dataSource.put).not.toBeCalled();
  });

  it("should call put", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    dataSource["requestRows"] = [
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ];
    dataSource.post = jest.fn();
    dataSource.put = jest.fn();

    dataSource.postOrPut({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      responseMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
        {
          type: "response",
          data: { id: 1 },
          timestamp: 0,
        },
      ],
    });

    expect(dataSource.post).not.toBeCalled();
    expect(dataSource.put).toBeCalledWith({
      id: "1",
      methodName: "getAll",
      serviceName: "user.userService",
      requestMetadata: {},
      responseMetadata: {},
      messages: [
        {
          type: "request",
          data: { name: "john" },
          timestamp: 0,
        },
        {
          type: "response",
          data: { id: 1 },
          timestamp: 0,
        },
      ],
    });
  });
});

describe("deleteAll", () => {
  it("should be able to delete all", () => {
    const dataSource = new RequestRowsInMemoryDataSource();
    const requestRows = <any>[
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
      },
    ];
    dataSource["requestRows"] = requestRows;

    dataSource.deleteAll();

    expect(requestRows).toEqual([
      {
        id: "1",
        methodName: "getAll",
        serviceName: "user.userService",
        requestMetadata: {},
        messages: [
          {
            type: "request",
            data: { name: "john" },
            timestamp: 0,
          },
        ],
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
