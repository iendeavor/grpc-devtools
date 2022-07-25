forwardMessage();
injectScript();

function forwardMessage() {
  let isReady = false;
  let payloadBuffer = [];

  let port = chrome.runtime.connect({ name: "content-script" });
  port.onMessage.addListener(handlePortMessage);
  window.addEventListener("message", handleMessageEvent);
  port.onDisconnect.addListener(() => {
    window.removeEventListener("message", handleMessageEvent);
    port?.onMessage.removeListener(handlePortMessage);
    port = null;
  });

  port.postMessage("ready");

  function handlePortMessage(message) {
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
    if (event.data.source && event.data.source === "__gRPC_devtools__") {
      payloadBuffer = payloadBuffer.concat(event.data.payload);
      flushIfReady();
    }
  }
  function flushIfReady() {
    if (isReady) {
      payloadBuffer.forEach((payload) => port?.postMessage(payload));
      payloadBuffer = [];
    }
  }
}

function injectScript() {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject.js");
  (document.head || document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}
