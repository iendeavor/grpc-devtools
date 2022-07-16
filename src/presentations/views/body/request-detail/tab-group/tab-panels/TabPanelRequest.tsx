import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { resolve, Tokens } from "@/service-locator";
import { RequestRow } from "@/entities/request-row";
import ReadonlyPre from "@/presentations/components/ReadonlyPre";

const TabPanelRequest = () => {
  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  const detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource);

  const [requestRows, setRequestRows] = useState<RequestRow[]>(
    requestRowsRepo.getAll()
  );
  useEffect(() => {
    return requestRowsRepo.subscribe(() => {
      setRequestRows(requestRowsRepo.getAll());
    }).unsubscribe;
  }, []);

  const [id, setId] = useState<null | string>(null);
  useEffect(() => {
    return detailInMemoryDataSource.subscribe((detail) => {
      setId(detail.requestId);
    }).unsubscribe;
  }, []);

  const requestRow = useMemo(() => {
    return requestRows.find((row) => row.id === id);
  }, [requestRows, id]);

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
