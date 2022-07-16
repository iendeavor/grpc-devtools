const postMessageToContentScript = ({ id, type, request, response, error }) => {
  const message = {
    source: "__gRPC_devtools__",
    payload: {
      id,
      type,
      methodName: request.getMethodDescriptor().name,
      requestMessage: request.getRequestMessage().toObject(),
      responseMessage: response?.getResponseMessage().toObject(),
      error,
    },
  };
  window.postMessage(message, "*");
};

class gRPCDevtoolsUnaryInterceptor {
  intercept = (request, invoker) => {
    const type = "unary";
    const id = Math.random().toString();

    postMessageToContentScript({ id, type, request });
    return invoker(request)
      .then((response) => {
        postMessageToContentScript({ id, type, request, response });
        return response;
      })
      .catch((error) => {
        postMessageToContentScript({ id, type, request, error });
        throw error;
      });
  };
}

window.__gRPC_devtools__ = {
  gRPCDevtoolsUnaryInterceptor: new gRPCDevtoolsUnaryInterceptor(),
};
