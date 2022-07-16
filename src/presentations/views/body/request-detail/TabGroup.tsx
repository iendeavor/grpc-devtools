import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { resolve, Tokens } from "@/service-locator";
import TabList from "./tab-group/TabList";
import TabPanels from "./tab-group/TabPanels";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import { RequestRow } from "@/entities/request-row";

export const tabs = ["headers", "request", "preview", "response"] as const;

const TabGroup = () => {
  const detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource);

  const [selectedIndex, setSelectedIndex] = useState(
    tabs.findIndex((tab) => tab === detailInMemoryDataSource.get().currentTab)
  );
  useEffect(() => {
    detailInMemoryDataSource.patch({
      currentTab: tabs.find((_, i) => i === selectedIndex)!,
    });
  }, [selectedIndex]);

  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);

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
    return requestRows.find((requestRow) => requestRow.id === id);
  }, [id, requestRows]);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className="relative flex flex-col w-full">
        {requestRow && (
          <>
            <TabList requestRow={requestRow}></TabList>
            <HorizontalDivider></HorizontalDivider>
            <TabPanels requestRow={requestRow}></TabPanels>
          </>
        )}
      </div>
    </Tab.Group>
  );
};

export default TabGroup;
