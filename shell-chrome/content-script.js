forwardMessage();
injectScript();

function forwardMessage() {
  let isReady = false;
  let pendingPayloads = [];

  window.addEventListener("message", handleMessageEvent);
  const port = chrome.runtime.connect({ name: "content-script" });
  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(() => {
    window.removeEventListener("message", handleMessageEvent);
    port?.onMessage.removeListener(handleMessage);
    port = null;
  });
  port.postMessage("ready");

  function handleMessage(message) {
    if (message === "ready") {
      handshake();
    }
  }
  function handshake() {
    if (isReady) return;

    port?.postMessage("ready");
    isReady = true;
    flushIfReady();
  }
  function handleMessageEvent(event) {
    if (event.source !== window) return;
    if (event.data.source && event.data.source === "__gRPC_devtools__") {
      pendingPayloads = pendingPayloads.concat(event.data.payload);
      flushIfReady();
    }
  }
  function flushIfReady() {
    if (isReady) {
      pendingPayloads.forEach((payload) => port.postMessage(payload));
      pendingPayloads = [];
    }
  }
}

function injectScript() {
  let s = document.createElement("script");
  s.type = "text/javascript";
  const scriptNode = document.createTextNode(
    `window.__gRPC_devtools__ = (${createInterceptors})()`
  );
  s.appendChild(scriptNode);
  (document.head || document.documentElement).appendChild(s);
  s.parentNode.removeChild(s);
}

function createInterceptors() {
  const postMessage = ({ id, type, request, response, error }) => {
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

      postMessage({ id, type, request });
      return invoker(request)
        .then((response) => {
          postMessage({ id, type, request, response });
          return response;
        })
        .catch((error) => {
          postMessage({ id, type, request, error });
          throw error;
        });
    };
  }

  return {
    gRPCDevtoolsUnaryInterceptor: new gRPCDevtoolsUnaryInterceptor(),
  };
}