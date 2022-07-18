import React from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelResponse = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel>
      {requestRow?.response?.responseMessage ? (
        <ReadonlyPre object={requestRow.response.responseMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelResponse;
