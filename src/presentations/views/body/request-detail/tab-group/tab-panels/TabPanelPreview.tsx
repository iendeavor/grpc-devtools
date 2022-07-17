import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import ReactJsonView from "react-json-view";
import useDetail from "@/presentations/composables/use-detail";
import useRequestRows from "@/presentations/composables/use-request-rows";

const TabPanelResponse = () => {
  const [requestRows] = useRequestRows();
  const [detail] = useDetail();
  const requestRow = useMemo(() => {
    return requestRows.find((row) => row.id === detail.requestId);
  }, [requestRows, detail]);

  return (
    <Tab.Panel>
      {requestRow?.responseMessage !== undefined ? (
        <ReactJsonView
          src={requestRow!.responseMessage!}
          theme="grayscale"
          name="$"
          collapsed={1}
        ></ReactJsonView>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelResponse;
