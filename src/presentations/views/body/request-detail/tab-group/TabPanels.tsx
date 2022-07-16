import React from "react";
import { Tab } from "@headlessui/react";
import TabPanelHeaders from "./tab-panels/TabPanelHeaders";
import TabPanelRequest from "./tab-panels/TabPanelRequest";
import TabPanelPreview from "./tab-panels/TabPanelPreview";
import TabPanelResponse from "./tab-panels/TabPanelResponse";
import { RequestRow } from "@/entities/request-row";

const TabPanels = ({ requestRow }: { requestRow: RequestRow }) => {
  return (
    <Tab.Panels className="absolute w-[calc(100%_-_8px)] top-[33px] right-0 bottom-0 left-1 overflow-auto">
      {requestRow && (
        <>
          <TabPanelHeaders requestRow={requestRow}></TabPanelHeaders>
          <TabPanelRequest requestRow={requestRow}></TabPanelRequest>

          {requestRow.type === "unary" && (
            <>
              <TabPanelPreview requestRow={requestRow}></TabPanelPreview>
              <TabPanelResponse requestRow={requestRow}></TabPanelResponse>
            </>
          )}
        </>
      )}
    </Tab.Panels>
  );
};

export default TabPanels;
