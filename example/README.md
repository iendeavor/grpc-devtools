# gRPC Devtools Example

Run the example:

1. Run the NodeJS gRPC service:

   ```shell
   cd server
   pnpm i --frozen-lockfile
   pnpm dev
   ```

2. Run the Envoy proxy:

   ```shell
   cd server
   envoy -c envoy.yaml
   ```

3. Run the simple web server:

   ```shell
   cd client
   pnpm i --frozen-lockfile
   pnpm dev
   ```

When these are all ready, you can open a browser tab and navigate to:

```
localhost:8080
```
