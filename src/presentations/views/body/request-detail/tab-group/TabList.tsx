import React from "react";
import { Tab } from "@headlessui/react";
import IconClose from "./tab-list/IconClose";
import useDetail from "@/presentations/composables/use-detail";
import { tabs } from "@/entities/detail";

const TabList = () => {
  const [detail, setDetail] = useDetail();
  const handleClear = () => {
    setDetail({
      ...detail,
      requestId: null,
    });
  };

  return (
    <div className="flex items-center">
      <IconClose onClear={handleClear}></IconClose>
      <Tab.List>
        {({ selectedIndex }) => (
          <>
            {tabs.map((tab, index) => {
              return (
                <Tab
                  key={tab}
                  className={
                    "py-1 px-2 cursor-default" +
                    (selectedIndex === index
                      ? " text-text-primary bg-[black]"
                      : " hover:bg-background-elevation-2")
                  }
                >
                  {tab.toUpperCase()[0] + tab.toLowerCase().slice(1)}
                </Tab>
              );
            })}
          </>
        )}
      </Tab.List>
    </div>
  );
};

export default TabList;
