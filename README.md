# gRPC Devtools

<div style="display: flex; justify-content: center;">
  <img src="./demo.png" width='720px'/>
</div>

## Usage

```ts
const gRPCDevtoolsUnaryInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsUnaryInterceptor;
const unaryInterceptors = gRPCDevtoolsUnaryInterceptor
  ? [gRPCDevtoolsUnaryInterceptor]
  : [];
const promiseClient = new MyServicePromiseClient(hostname, credentials, {
  unaryInterceptors: unaryInterceptors,
});
```

## TypeScript

```ts
import type { UnaryInterceptor } from "grpc-web";

declare const __gRPC_devtools__:
  | undefined
  | {
      gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
    };
```

## TODOs

- Stream interceptors
- Search
- Light mode
