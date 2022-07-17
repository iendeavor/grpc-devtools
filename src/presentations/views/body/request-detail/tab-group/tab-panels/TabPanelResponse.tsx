import React from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelResponse = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel>
      {requestRow?.responseMessage ? (
        <ReadonlyPre object={requestRow?.responseMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelResponse;
