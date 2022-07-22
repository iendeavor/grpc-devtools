import React from "react";
import { Tab } from "@headlessui/react";
import ReactJsonView from "react-json-view";
import useRequestRow from "@/presentations/composables/use-request-row";

const TabPanelResponse = () => {
  const requestRow = useRequestRow();

  return (
    <Tab.Panel className="h-full">
      {requestRow?.response?.responseMessage ? (
        <ReactJsonView
          src={requestRow.response.responseMessage}
          theme="grayscale"
          name="$"
          collapsed={1}
        ></ReactJsonView>
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
