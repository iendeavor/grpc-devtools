import React from "react";
import VerticalDivider from "@/presentations/components/VerticalDivider";
import IconRecording from "./toolbar/IconRecording";
import IconClear from "./toolbar/IconClear";
import IconFilter from "./toolbar/IconFilter";
// import IconSearch from "./toolbar/IconSearch";
import PreserveLog from "./toolbar/PreserveLog";

const Toolbar = () => {
  return (
    <div className="flex flex-wrap items-center select-none px-1">
      <IconRecording></IconRecording>
      <div className="w-1"></div>
      <IconClear></IconClear>
      <VerticalDivider className="mx-2"></VerticalDivider>
      <IconFilter></IconFilter>
      {/* <div className="w-1"></div> */}
      {/* <IconSearch></IconSearch> */}
      <VerticalDivider className="mx-2"></VerticalDivider>
      <PreserveLog></PreserveLog>
    </div>
  );
};

export default Toolbar;
