import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import useRequestRow from "@/presentations/composables/use-request-row";
import Collapse from "./tab-panel-headers/Collapse";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";

const TabPanelRequest = ({ isFocusIn }: { isFocusIn: boolean }) => {
  const requestRow = useRequestRow();

  const headers = useMemo(() => {
    return {
      general: {
        "Service Name":
          requestRow?.request.methodDescriptor.name
            .split("/")
            .slice(1, -1)
            .join("/") ?? "",
        "Method Name":
          requestRow?.request.methodDescriptor.name.split("/").pop() ?? "",
      },
      responseMetadata: requestRow?.response
        ? requestRow.response.metadata
        : requestRow?.error
        ? requestRow.error.metadata
        : {},
      requestMetadata: requestRow?.request ? requestRow.request.metadata : {},
    };
  }, [requestRow]);

  return (
    <Tab.Panel className="mt-0.5">
      {requestRow ? (
        <>
          <Collapse
            title="General"
            value={headers.general}
            isFocusIn={isFocusIn}
            offsetIndexes={[0]}
          ></Collapse>
          <HorizontalDivider className="mt-1.5"></HorizontalDivider>
          <Collapse
            title="Response Metadata"
            value={headers.responseMetadata}
            isFocusIn={isFocusIn}
            offsetIndexes={[0, Object.keys(headers.general).length]}
            displayCountOnCollapse
          ></Collapse>
          <HorizontalDivider className="mt-1.5"></HorizontalDivider>
          <Collapse
            title="Request Metadata"
            value={headers.requestMetadata}
            isFocusIn={isFocusIn}
            offsetIndexes={[
              0,
              Object.keys(headers.general).length,
              Object.keys(headers.responseMetadata).length,
            ]}
            displayCountOnCollapse
          ></Collapse>
        </>
      ) : (
        <></>
      )}
      {/* {requestRow ? (
        <ReadonlyPre object={headers}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )} */}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
