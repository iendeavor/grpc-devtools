# gRPC Devtools

<div style="display: flex; justify-content: center;">
  <img src="./demo.png" width='720px'/>
</div>

## Usage

```ts
const gRPCDevtoolsStreamInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsStreamInterceptor;
const streamInterceptors = gRPCDevtoolsStreamInterceptor
  ? [gRPCDevtoolsStreamInterceptor]
  : [];

const gRPCDevtoolsUnaryInterceptor =
  typeof __gRPC_devtools__ === "object" &&
  __gRPC_devtools__ !== null &&
  __gRPC_devtools__.gRPCDevtoolsUnaryInterceptor;
const unaryInterceptors = gRPCDevtoolsUnaryInterceptor
  ? [gRPCDevtoolsUnaryInterceptor]
  : [];

const client = new ChatServicePromiseClient(hostname, credentials, {
  unaryInterceptors: unaryInterceptors,
  streamInterceptors: streamInterceptors,
});
```

## TypeScript

```ts
import type { StreamInterceptor, UnaryInterceptor } from "grpc-web";

declare const __gRPC_devtools__:
  | undefined
  | {
      gRPCDevtoolsStreamInterceptor: StreamInterceptor<unknown, unknown>;
      gRPCDevtoolsUnaryInterceptor: UnaryInterceptor<unknown, unknown>;
    };
```

## TODOs

- Search
- Light mode
