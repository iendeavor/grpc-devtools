import React from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelRequest = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel>
      {requestRow ? (
        <ReadonlyPre object={requestRow.request.requestMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
