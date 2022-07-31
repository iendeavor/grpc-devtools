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
    <div className="flex items-center bg-[#f1f3f4] dark:bg-[#292a2d]">
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
                      ? " text-[#333333] dark:text-[#eaeaea] bg-[#f1f3f4] dark:bg-[#000000] border-b border-[#1b73e8] dark:border-none hover:bg-[#dfe1e5] dark:hover:bg-transparent"
                      : " text-[#5f6367] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#dfe1e5] dark:hover:bg-[#35363a]")
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
