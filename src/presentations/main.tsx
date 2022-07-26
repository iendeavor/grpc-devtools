import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/presentations/assets/index.css";
import { resolve, Tokens } from "@/service-locator";
import { RequestRow } from "@/entities/request-row";
import { postOrPutMultipleRequestRows } from "@/interactors/post-or-put-multiple-request-rows";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
requestRowsRepo.hydrate();
const configRepo = resolve(Tokens.ConfigRepo);

if (__ENV__.MODE === "production") {
  initDevtools();

  function initDevtools() {
    chrome.devtools.network.onNavigated.addListener(() => {
      if (configRepo.get().shouldPreserveLog) {
        requestRowsRepo.hydrate();
      } else {
        requestRowsRepo.deleteAll();
      }
    });

    let port: null | chrome.runtime.Port = chrome.runtime.connect({
      name: chrome.devtools.inspectedWindow.tabId.toString(),
    });

    port.onMessage.addListener(handleMessage);

    port.onDisconnect.addListener(() => {
      port?.onMessage.removeListener(handleMessage);
      port = null;
      initDevtools();
    });

    port.postMessage("ready");

    function handleMessage(message: any) {
      if (message === "ready") {
        handshake();
      } else {
        saveRequestRows(message);
      }
    }

    function handshake() {
      port?.postMessage("ready");
    }

    function saveRequestRows(message: any) {
      const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
      const allRequestRows = requestRowsRepo.getAll();
      const oldMessages =
        allRequestRows.find((requestRow) => requestRow.id === message.id)
          ?.messages ?? [];

      const requestRow: RequestRow = {
        id: message.id,
        methodName: message.methodName,
        serviceName: message.serviceName,
        requestMetadata: message.requestMetadata,
        responseMetadata: message.responseMetadata,
        errorMetadata: message.errorMetadata,
        messages: [
          ...oldMessages,
          ...(message.requestMessage
            ? [
                {
                  type: "request" as const,
                  data: message.requestMessage,
                  timestamp: message.timestamp,
                },
              ]
            : []),
          ...(message.responseMessage
            ? [
                {
                  type: "response" as const,
                  data: message.responseMessage,
                  timestamp: message.timestamp,
                },
              ]
            : []),
        ],
      };

      postOrPutMultipleRequestRows({
        requestRows: [requestRow],
      });
    }
  }
}

if (__ENV__.MODE === "development") {
  window.addEventListener("beforeunload", () => {
    if (configRepo.get().shouldPreserveLog) {
      requestRowsRepo.hydrate();
    } else {
      requestRowsRepo.deleteAll();
    }
  });

  const offset = requestRowsRepo.getAll().length;
  const requestRows: RequestRow[] = Array(10)
    .fill(null)
    .map((_, index) => {
      index += offset;

      const responseCount =
        Math.random() > 0.5 ? 100 : Math.random() > 0.5 ? 1 : 0;
      const hasError = Math.random() > 0.7;

      return {
        id: index.toString(),
        methodName: `chat`,
        serviceName: `chat.chatService`,
        requestMetadata: {},
        ...(responseCount
          ? {
              responseMetadata: {
                "cache-control": "no-cache",
              },
            }
          : {}),
        messages: [
          {
            type: "request" as const,
            data: {
              users: Array(1)
                .fill(null)
                .map(() => ({
                  id: index.toString(),
                  request: "foo ".repeat(10),
                })),
            },
            timestamp: Date.now(),
          },
          ...Array(responseCount)
            .fill(null)
            .map((_, index) => ({
              type: "response" as const,
              data: {
                users: Array(Math.floor(Math.random() * 100))
                  .fill(null)
                  .map(() => ({
                    id: index.toString(),
                    response: "foo ".repeat(100),
                  })),
              },
              timestamp: Date.now(),
            })),
        ],
        ...(hasError
          ? {
              errorMetadata: {
                "cache-control": "no-cache",
                "content-length": "0",
                "content-type": "application/grpc-web-text+proto",
                "grpc-message":
                  "rpc error: code = code = Unimplemented desc = method Hello not implemented",
                "grpc-status": "GRPC_STATUS_UNIMPLEMENTED",
              },
            }
          : {}),
      };
    });

  requestRows.forEach((requestRow, index) => {
    setTimeout(() => {
      postOrPutMultipleRequestRows({ requestRows: [requestRow] });
    }, index * 300);
  });
}
