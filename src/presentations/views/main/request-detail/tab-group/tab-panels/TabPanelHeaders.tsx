import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelRequest = () => {
  const requestRow = useRequestRow();

  const headers = useMemo(() => {
    return {
      General: {
        "Service Name": requestRow?.request.methodDescriptor.name
          .split("/")
          .slice(1, -1)
          .join("/"),
        "Method Name": requestRow?.request.methodDescriptor.name
          .split("/")
          .pop(),
      },
      Response: requestRow?.response
        ? requestRow.response.metadata
        : requestRow?.error
        ? requestRow.error.metadata
        : undefined,
      Request: requestRow?.request ? requestRow.request.metadata : undefined,
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
