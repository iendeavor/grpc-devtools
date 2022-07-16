import React from "react";
import { Tab } from "@headlessui/react";
import { RequestRow } from "@/entities/request-row";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";

const TabPanelRequest = ({ requestRow }: { requestRow: RequestRow }) => {
  return (
    <Tab.Panel>
      {requestRow !== undefined ? (
        <ReadonlyPre object={requestRow.requestMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
