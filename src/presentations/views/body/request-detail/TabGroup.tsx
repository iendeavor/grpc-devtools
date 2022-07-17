import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import TabList from "./tab-group/TabList";
import TabPanels from "./tab-group/TabPanels";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import useDetail from "@/presentations/composables/use-detail";
import { tabs } from "@/entities/detail";

const TabGroup = () => {
  const [detail, setDetail] = useDetail();
  const [selectedIndex, setSelectedIndex] = useState(
    tabs.findIndex((tab) => tab === detail.currentTab)
  );
  useEffect(() => {
    setDetail({
      ...detail,
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
