const postMessageToContentScript = ({
  id,
  methodName,
  serviceName,
  requestMessage,
  requestMetadata,
  responseMetadata,
  responseMessage,
  errorMetadata,
}) => {
  const message = {
    source: "__gRPC_devtools__",
    payload: {
      id,
      timestamp: Date.now(),
      methodName,
      serviceName,
      requestMetadata,
      requestMessage,
      responseMetadata,
      responseMessage,
      errorMetadata,
    },
  };
  window.postMessage(message, "*");
};

class gRPCDevtoolsUnaryInterceptor {
  intercept = (request, invoker) => {
    const id = Math.random().toString();

    postMessageToContentScript({
      id,
      methodName: request.getMethodDescriptor().name.split("/").pop(),
      serviceName: request
        .getMethodDescriptor()
        .name.split("/")
        .slice(1, -1)
        .join("/"),
      requestMetadata: request.getMetadata(),
      requestMessage: request.getRequestMessage().toObject(),
    });
    return invoker(request)
      .then((response) => {
        postMessageToContentScript({
          id,
          responseMetadata: {
            ...response.getMetadata(),
            ...response.getStatus().metadata,
          },
          responseMessage: response.getResponseMessage().toObject(),
        });
        return response;
      })
      .catch((error) => {
        postMessageToContentScript({
          id,
          responseMessage: {
            name: error.name,
            code: error.code,
            message: error.message,
            stack: error.stack,
          },
          errorMetadata: error.metadata,
        });
        throw error;
      });
  };
}

class InterceptedStream {
  constructor({ id, stream }) {
    this.id = id;
    this.stream = stream;
  }

  onError = (callback) => {
    const errorCallback = (error) => {
      postMessageToContentScript({
        id: this.id,
        responseMessage: {
          name: error.name,
          code: error.code,
          message: error.message,
          stack: error.stack,
        },
        errorMetadata: error.metadata,
      });
      callback(error);
    };
    this.stream.on("error", errorCallback);
  };

  onStatus = (callback) => {
    const statusCallback = (status) => {
      if (status.code === 0) {
        postMessageToContentScript({
          id: this.id,
          responseMetadata: status.metadata,
        });
      } else {
        postMessageToContentScript({
          id: this.id,
          errorMetadata: status.metadata,
        });
      }
      callback(status);
    };
    this.stream.on("status", statusCallback);
  };

  onMetadata = (callback) => {
    const metadataCallback = (metadata) => {
      callback(metadata);
    };
    this.stream.on("metadata", metadataCallback);
  };

  onData = (callback) => {
    const dataCallback = (data) => {
      postMessageToContentScript({
        id: this.id,
        responseMessage: data.toObject(),
      });
      callback(data);
    };
    this.stream.on("data", dataCallback);
  };

  onEnd = (callback) => {
    const endCallback = () => {
      callback();
    };
    this.stream.on("end", endCallback);
  };

  on = (eventType, callback) => {
    switch (eventType) {
      case "error":
        this.onError(callback);
        break;
      case "status":
        this.onStatus(callback);
        break;
      case "metadata":
        this.onMetadata(callback);
        break;
      case "data":
        this.onData(callback);
        break;
      case "end":
        this.onEnd(callback);
        break;
    }

    return this;
  };
  removeListener(eventType, callback) {
    // noop
  }
  cancel = () => {
    this.stream.cancel();
  };
}

class ServerStreamInterceptor {
  intercept = function (request, invoker) {
    const id = Math.random().toString();
    postMessageToContentScript({
      id,
      methodName: request.getMethodDescriptor().name.split("/").pop(),
      serviceName: request
        .getMethodDescriptor()
        .name.split("/")
        .slice(1, -1)
        .join("/"),
      requestMessage: request.getRequestMessage().toObject(),
      requestMetadata: request.getMetadata(),
    });
    return new InterceptedStream({ id, stream: invoker(request) });
  };
}

window.__gRPC_devtools__ = {
  gRPCDevtoolsUnaryInterceptor: new gRPCDevtoolsUnaryInterceptor(),
  gRPCDevtoolsStreamInterceptor: new ServerStreamInterceptor(),
};
