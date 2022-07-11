let ports = {};

chrome.runtime.onConnect.addListener((port) => {
  console.debug("connecting", port);

  const isContentScript = port.sender.tab !== undefined;
  const tab = isContentScript ? port.sender.tab.id : port.name;
  const name = isContentScript ? port.name : "panel";
  ports = { ...ports };
  ports[tab] = { ...ports[tab] };
  if (ports[tab][name]) ports[tab][name].disconnect();
  ports[tab][name] = port;

  let contentScript = ports[tab]["content-script"];
  let panel = ports[tab].panel;

  if (contentScript) {
    contentScript.onMessage.addListener(handleMessage);
    contentScript.onDisconnect.addListener(() => {
      console.debug("disconnected", contentScript);
      contentScript.onMessage.removeListener(handleMessage);
      contentScript = null;
      ports = { ...ports };
      ports[tab] = { ...ports[tab] };
      delete ports[tab]["content-script"];
      if (Object.keys(ports[tab]).length === 0) delete ports[tab];
      console.debug(ports);
    });
    function handleMessage(message) {
      console.debug("handleMessage", message);
      const panel = ports[tab].panel;
      if (panel) {
        panel.postMessage(message);
      }
    }
  }

  if (panel) {
    panel.onMessage.addListener(handleMessage);
    panel.onDisconnect.addListener(() => {
      console.debug("disconnected", panel);
      panel.onMessage.removeListener(handleMessage);
      panel = null;
      ports = { ...ports };
      ports[tab] = { ...ports[tab] };
      delete ports[tab].panel;
      if (Object.keys(ports[tab]).length === 0) delete ports[tab];
      console.debug(ports);
    });
    function handleMessage(message) {
      console.debug("handleMessage", message);
      const contentScript = ports[tab]["content-script"];
      if (contentScript) {
        contentScript.postMessage(message);
      }
    }
  }

  console.debug("ports", ports);
});
