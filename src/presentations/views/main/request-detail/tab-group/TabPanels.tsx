import React from "react";
import { Tab } from "@headlessui/react";
import TabPanelHeaders from "./tab-panels/TabPanelHeaders";
import TabPanelRequest from "./tab-panels/TabPanelRequest";
import TabPanelPreview from "./tab-panels/TabPanelPreview";
import TabPanelResponse from "./tab-panels/TabPanelResponse";

const TabPanels = () => {
  return (
    <Tab.Panels className="absolute w-[calc(100%_-_8px)] top-[33px] right-0 bottom-0 left-1 overflow-auto">
      <TabPanelHeaders></TabPanelHeaders>
      <TabPanelRequest></TabPanelRequest>
      <TabPanelPreview></TabPanelPreview>
      <TabPanelResponse></TabPanelResponse>
    </Tab.Panels>
  );
};

export default TabPanels;
