import React from "react";
import { Tab } from "@headlessui/react";
import { RequestRow } from "@/entities/request-row";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";

const TabPanelResponse = ({
  requestRow,
}: {
  requestRow: RequestRow & { type: "unary" };
}) => {
  return (
    <Tab.Panel>
      {requestRow?.responseMessage !== undefined ? (
        <ReadonlyPre object={requestRow?.responseMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelResponse;
