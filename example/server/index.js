const PROTO_PATH = __dirname + "/../protos/chat.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const chat_proto = grpc.loadPackageDefinition(packageDefinition).chat;

/**
 * @type {grpc.ServerWritableStream<any, any>[]}
 */
const users = [];

/**
 * @param {grpc.ServerUnaryCall<any, any>} call
 * @param {grpc.sendUnaryData<any>} callback
 */
function sendMessage(call, callback) {
  const request = call.request;
  if (request.message.includes("error")) {
    const metadata = new grpc.Metadata();
    metadata.add("custom-header-1", "error");
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Length of `Name` cannot be more than 10 characters",
      details: "details",
      metadata,
    });
  } else if (request.message.includes("end")) {
    users.forEach((user) => {
      const metadata = new grpc.Metadata();
      metadata.add("stream", "end");
      user.sendMetadata(metadata);
      user.end();
    });

    const metadata = new grpc.Metadata();
    metadata.add("custom-header-1", "end");
    callback({
      code: grpc.status.OK,
      message: "End",
      metadata,
    });
  } else {
    users.forEach((user) => {
      if (Math.random() > 0.8) {
        const metadata = new grpc.Metadata();
        metadata.add("stream", "error");
        const status = {
          code: 2,
          message: "something went wrong",
          metadata,
        };
        user.emit("error", status);
      } else {
        users.forEach((user) => {
          const metadata = new grpc.Metadata();
          metadata.add("stream", "response");
          user.sendMetadata(metadata);
          user.write(request);
        });
      }
    });

    const metadata = new grpc.Metadata();
    metadata.add("custom-header-1", "response");
    callback(null, null, metadata);
  }
}

/**
 * @param {grpc.ServerWritableStream<any, any>} call
 */
function onMessage(call) {
  users.length = 0;
  users.push(call);
}

/**
 * Starts an RPC server that receives requests for the Chat service at the
 * sample server port
 */
function main() {
  const host = "0.0.0.0";
  const port = 9090;
  const server = new grpc.Server();
  server.addService(chat_proto.ChatService.service, { sendMessage, onMessage });
  server.bindAsync(
    `${host}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(`Server running at ${host}:${port}`);
    }
  );
}

main();
