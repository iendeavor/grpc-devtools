import React, { useRef } from "react";
import { Tab } from "@headlessui/react";
import TabPanelHeaders from "./tab-panels/TabPanelHeaders";
import TabPanelMessages from "./tab-panels/TabPanelMessages";
import useIsFocusIn from "@/presentations/composables/use-is-focus-in";

const TabPanels = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isFocusIn = useIsFocusIn({ ref, initialValue: false });

  return (
    <Tab.Panels
      ref={ref}
      className="absolute w-full top-[25px] right-0 bottom-0 left-0 overflow-auto"
    >
      <TabPanelHeaders isFocusIn={isFocusIn}></TabPanelHeaders>
      <TabPanelMessages isFocusIn={isFocusIn}></TabPanelMessages>
    </Tab.Panels>
  );
};

export default TabPanels;
