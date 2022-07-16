import React from "react";
import { Tab } from "@headlessui/react";
import { RequestRow } from "@/entities/request-row";
import ReactJsonView from "react-json-view";

const TabPanelResponse = ({
  requestRow,
}: {
  requestRow: RequestRow & { type: "unary" };
}) => {
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
