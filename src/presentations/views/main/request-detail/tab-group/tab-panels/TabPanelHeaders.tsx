import React, { useMemo, useRef } from "react";
import { Tab } from "@headlessui/react";
import useRequestRow from "@/presentations/composables/use-request-row";
import Collapse from "./tab-panel-headers/Collapse";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import useIsFocusIn from "@/presentations/composables/use-is-focus-in";

const TabPanelRequest = () => {
  const requestRow = useRequestRow();

  const headers = useMemo(() => {
    return {
      General: {
        "Service Name":
          requestRow?.request.methodDescriptor.name
            .split("/")
            .slice(1, -1)
            .join("/") ?? "",
        "Method Name":
          requestRow?.request.methodDescriptor.name.split("/").pop() ?? "",
      },
      Response: requestRow?.response
        ? requestRow.response.metadata
        : requestRow?.error
        ? requestRow.error.metadata
        : {},
      Request: requestRow?.request ? requestRow.request.metadata : {},
    };
  }, [requestRow]);

  const ref = useRef<HTMLDivElement | null>(null);
  const isFocusIn = useIsFocusIn({ ref, initialValue: false });

  return (
    <Tab.Panel ref={ref}>
      {requestRow ? (
        <>
          <Collapse
            title="General"
            value={headers.General}
            isFocusIn={isFocusIn}
            offsetIndexes={[0]}
          ></Collapse>
          <HorizontalDivider className="my-1"></HorizontalDivider>
          <Collapse
            title="Response"
            value={headers.Response}
            isFocusIn={isFocusIn}
            offsetIndexes={[0, Object.keys(headers.General).length]}
          ></Collapse>
          <HorizontalDivider className="my-1"></HorizontalDivider>
          <Collapse
            title="Request"
            value={headers.Request}
            isFocusIn={isFocusIn}
            offsetIndexes={[
              0,
              Object.keys(headers.General).length,
              Object.keys(headers.Response).length,
            ]}
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
