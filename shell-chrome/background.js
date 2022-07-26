let ports = {};

chrome.runtime.onConnect.addListener((port) => {
  console.debug("connecting", port);

  const isPanel = parseInt(port.name, 10).toString() === port.name;
  const tab = isPanel ? port.name : port.sender.tab.id;
  const name = isPanel ? "panel" : port.name;
  ports = { ...ports };
  ports[tab] = { ...ports[tab] };
  if (ports[tab][name]) ports[tab][name].disconnect();
  ports[tab][name] = port;

  if (isPanel) {
    console.debug("panel");
    let panel = ports[tab].panel;
    panel.onMessage.addListener(handleMessage);
    panel.onDisconnect.addListener(() => {
      console.debug("[panel] disconnected", panel);
      panel.onMessage.removeListener(handleMessage);
      panel = null;
      ports = { ...ports };
      ports[tab] = { ...ports[tab] };
      delete ports[tab].panel;
      if (Object.keys(ports[tab]).length === 0) delete ports[tab];
      console.debug("[panel]", ports);
    });
    function handleMessage(message) {
      console.debug("[panel] handleMessage", message);
      const contentScript = ports[tab]["content-script"];
      if (contentScript) {
        contentScript.postMessage(message);
      }
    }
  } else {
    console.debug("content-script");
    let contentScript = ports[tab]["content-script"];
    contentScript.onMessage.addListener(handleMessage);
    contentScript.onDisconnect.addListener(() => {
      console.debug("[content-script] disconnected", contentScript);
      contentScript.onMessage.removeListener(handleMessage);
      contentScript = null;
      ports = { ...ports };
      ports[tab] = { ...ports[tab] };
      delete ports[tab]["content-script"];
      if (Object.keys(ports[tab]).length === 0) delete ports[tab];
      console.debug("[content-script]", ports);
    });
    function handleMessage(message) {
      console.debug("[content-script] handleMessage", message);
      const panel = ports[tab].panel;
      if (panel) {
        panel.postMessage(message);
      }
    }
    // force reconnect
    setTimeout(() => {
      if (ports[tab] && ports[tab]["content-script"] === port) {
        port.disconnect();
      }
    }, 60 * 1000);
  }

  console.debug("ports", ports);
});
