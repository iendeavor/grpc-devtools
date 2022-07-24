import React, { useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import useRequestRow from "@/presentations/composables/use-request-row";
import Collapse from "./tab-panel-headers/Collapse";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import { useInterval } from "react-use";

const TabPanelRequest = ({ isFocusIn }: { isFocusIn: boolean }) => {
  const requestRow = useRequestRow();

  // FIXME: requestRow didn't trigger re-render, force trigger re-render now.
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((count + 1) % 1000);
  }, 100);

  const headers = useMemo(() => {
    return {
      general: {
        "Service Name": requestRow?.serviceName ?? "",
        "Method Name": requestRow?.methodName ?? "",
      },
      responseMetadata:
        requestRow?.responseMetadata ?? requestRow?.errorMetadata ?? {},
      requestMetadata: requestRow?.requestMetadata ?? {},
    };
  }, [requestRow, count]);

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
