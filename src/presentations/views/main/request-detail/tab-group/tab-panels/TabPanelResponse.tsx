import React from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelResponse = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel className="h-full p-1">
      {requestRow?.response?.responseMessage ? (
        <ReadonlyPre
          className="h-full w-full overflow-auto"
          object={requestRow.response.responseMessage}
        ></ReadonlyPre>
      ) : requestRow?.error ? (
        <div className="flex justify-center items-center h-full">
          Failed to load response data.
        </div>
      ) : (
        <></>
      )}
    </Tab.Panel>
  );
};

export default TabPanelResponse;
