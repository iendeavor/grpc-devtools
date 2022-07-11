# gRPC Devtools

## Usage

```ts
const promiseClient = new MyServicePromiseClient(hostname, credentials, {
  unaryInterceptors: [window.__gRPC_devtools__.gRPCDevtoolsUnaryInterceptor],
});
```

## TODOs

- Stream interceptors
- Light theme
