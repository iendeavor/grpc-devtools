import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { resolve, Tokens } from "@/service-locator";
import { RequestRow } from "@/entities/request-row";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";
import useDetail from "@/presentations/composables/use-detail";

const TabPanelRequest = () => {
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
      {requestRow !== undefined ? (
        <ReadonlyPre object={requestRow.requestMessage}></ReadonlyPre>
      ) : (
        <div>No content available</div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelRequest;
