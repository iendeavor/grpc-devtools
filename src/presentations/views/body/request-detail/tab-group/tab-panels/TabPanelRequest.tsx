import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useDetail from "@/presentations/composables/use-detail";
import useRequestRows from "@/presentations/composables/use-request-rows";

const TabPanelRequest = () => {
  const [requestRows] = useRequestRows();
  const [detail] = useDetail();
  const requestRow = useMemo(() => {
    return requestRows.find((row) => row.id === detail.requestId);
  }, [requestRows, detail]);

  return (
    <Tab.Panel>
      {requestRow !== undefined ? (
        <ReadonlyPre object={requestRow.requestMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
