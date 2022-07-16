import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import { RequestRow } from "@/entities/request-row";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";

const TabPanelRequest = ({ requestRow }: { requestRow: RequestRow }) => {
  const headers = useMemo(() => {
    return {
      General: {
        Method: requestRow?.methodName,
      },
    };
  }, [requestRow]);

  return (
    <Tab.Panel>
      {requestRow !== undefined ? (
        <ReadonlyPre object={headers}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
