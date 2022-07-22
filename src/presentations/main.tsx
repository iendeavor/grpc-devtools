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
    postOrPutMultipleRequestRows({
      requestRows: [message],
    });
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
      return {
        id: index.toString(),
        type: "unary",
        request: {
          metadata: {},
          methodDescriptor: {
            name: `/Service/getUser${index}`,
          },
          requestMessage: {
            users: [
              {
                id: index.toString(),
              },
            ],
          },
        },
        ...(Math.random() > 0.3
          ? {
              response: {
                metadata: {
                  "cache-control": "no-cache",
                },
                methodDescriptor: {
                  name: `/Service/getUser${index}`,
                },
                responseMessage: {
                  users: Array(100)
                    .fill(null)
                    .map(() => ({
                      id: index.toString(),
                      name: "foo".repeat(100),
                    })),
                },
              },
            }
          : {
              error: {
                metadata: {
                  "cache-control": "no-cache",
                  "content-length": "0",
                  "content-type": "application/grpc-web-text+proto",
                  "grpc-message":
                    "rpc error: code = code = Unimplemented desc = method Hello not implemented",
                  "grpc-status": "GRPC_STATUS_UNIMPLEMENTED",
                },
                methodDescriptor: {
                  name: `/Service/getUser${index}`,
                },
                code: "13",
                message:
                  "%E4%BE%8B%E5%A4%96%E9%8C%AF%E8%AA%A4: rpc error: code = Internal desc = %E4%BE%8B%E5%A4%96%E9%8C%AF%E8%AA%A4: Error 1062: Duplicate entry '999b9a86-7aee-4d51-83de-02894d38092d-a47faecf-cd66-42c2-829b-cf2' for key 'lady_followers.lady_object_id'",
              },
            }),
      };
    });

  postOrPutMultipleRequestRows({ requestRows });
}
