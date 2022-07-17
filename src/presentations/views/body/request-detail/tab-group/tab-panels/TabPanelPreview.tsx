import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { resolve, Tokens } from "@/service-locator";
import { RequestRow } from "@/entities/request-row";
import ReactJsonView from "react-json-view";
import useDetail from "@/presentations/composables/use-detail";

const TabPanelResponse = () => {
  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);

  const [requestRows, setRequestRows] = useState<RequestRow[]>(
    requestRowsRepo.getAll()
  );
  useEffect(() => {
    return requestRowsRepo.subscribe(() => {
      setRequestRows(requestRowsRepo.getAll());
    }).unsubscribe;
  }, []);

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
