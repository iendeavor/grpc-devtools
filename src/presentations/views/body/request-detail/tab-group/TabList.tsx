import React, { useMemo } from "react";
import { Tab } from "@headlessui/react";
import { tabs } from "../TabGroup";
import { RequestRow } from "@/entities/request-row";

const TabList = ({ requestRow }: { requestRow: RequestRow }) => {
  const availableTabs = useMemo<typeof tabs[number][]>(() => {
    if (requestRow.type === "unary") {
      return ["headers", "preview", "request", "response"];
    } else {
      return ["headers", "preview"];
    }
  }, [requestRow]);

  return (
    <div className="flex items-center">
      <Tab.List>
        {({ selectedIndex }) => (
          <>
            {availableTabs.map((tab, index) => {
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
