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

if (
  typeof chrome !== "undefined" &&
  typeof chrome.runtime !== "undefined" &&
  typeof chrome.devtools !== "undefined"
) {
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
} else {
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
        response: {
          metadata: {},
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
      };
    });

  postOrPutMultipleRequestRows({ requestRows });
}
