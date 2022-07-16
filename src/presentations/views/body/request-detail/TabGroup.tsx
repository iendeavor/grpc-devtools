import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { resolve, Tokens } from "@/service-locator";
import TabList from "./tab-group/TabList";
import TabPanels from "./tab-group/TabPanels";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";

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

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <div className="relative flex flex-col w-full">
        <TabList></TabList>
        <HorizontalDivider></HorizontalDivider>
        <TabPanels></TabPanels>
      </div>
    </Tab.Group>
  );
};

export default TabGroup;
