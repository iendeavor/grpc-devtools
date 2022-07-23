import React from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelRequest = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel className="h-full p-1">
      {requestRow && (
        <ReadonlyPre
          className="h-full w-full overflow-auto"
          object={requestRow.request.requestMessage}
        ></ReadonlyPre>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
