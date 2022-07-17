import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelRequest = () => {
  const requestRow = useRequestRow();

  const headers = useMemo(() => {
    return {
      General: {
        Method: requestRow?.methodName,
      },
    };
  }, [requestRow]);

  return (
    <Tab.Panel>
      {requestRow ? (
        <ReadonlyPre object={headers}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
