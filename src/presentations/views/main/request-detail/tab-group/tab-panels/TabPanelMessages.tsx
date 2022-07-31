import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import useRequestRow from "@/presentations/composables/use-request-row";
import MessageData from "./tab-panel-messages/MessageData";
import VirtualList from "@/presentations/components/VirtualList";

const formatter = Intl.DateTimeFormat("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const padStart = (str: string, maxLength: number, fillString: string) => {
  return fillString.repeat(maxLength - str.length) + str;
};
const getTime = (timestamp: number): string => {
  return (
    formatter.format(timestamp) +
    "." +
    padStart((timestamp % 1000).toString(), 3, "0")
  );
};

const TabPanelMessages = ({ isFocusIn }: { isFocusIn: boolean }) => {
  const requestRow = useRequestRow();

  const [highlightIndex, setHighlightIndex] = useState<null | number>(null);
  useEffect(() => {
    setHighlightIndex(null);
  }, [requestRow]);

  const handleDone = (index: number) => {
    setHighlightIndex(index);
  };

  const currentData = useMemo(() => {
    if (requestRow === null) return null;
    if (highlightIndex === null) return null;
    return requestRow.messages[highlightIndex]?.data ?? null;
  }, [highlightIndex, requestRow]);

  const renderItem = (index: number) => {
    const message = requestRow?.messages[index];
    if (message === undefined) return <></>;

    if (message.type === "request") {
      return (
        <div
          key={message.timestamp + "-" + index}
          className={
            "flex items-center cursor-default border-b border-[#cbcdd1] dark:border-[#4a4c50]" +
            (isFocusIn && highlightIndex === index
              ? " bg-[#1d73e8] dark:bg-[#0f639c]"
              : highlightIndex === index
              ? " bg-[#dadcd0] dark:bg-[#454545]"
              : " bg-[#e2f7da] dark:bg-[#102508]")
          }
          onClick={() => setHighlightIndex(index)}
        >
          <div className="flex flex-1 items-center overflow-hidden border-r border-[#cbcdd1] dark:border-[#4a4c50]">
            <span
              className={
                "material-symbols-rounded text-sm font-bold mx-1" +
                (isFocusIn && highlightIndex === index
                  ? " text-[#ffffff] dark:text-[#000000]"
                  : " text-[#63acbe] dark:text-[#63acbe]")
              }
            >
              arrow_upward
            </span>
            <span
              className={
                "whitespace-nowrap overflow-hidden text-ellipsis" +
                (isFocusIn && highlightIndex === index
                  ? " text-[#ffffff] dark:text-[#ffffff]"
                  : " text-[#303942] dark:text-[#bec6cf]")
              }
            >
              {JSON.stringify(message.data)}
            </span>
          </div>
          <div
            className={
              "px-1 w-24 font-mono" +
              (isFocusIn && highlightIndex === index
                ? " text-[#ffffff] dark:text-[#ffffff]"
                : " text-[#303942] dark:text-[#bec6cf]")
            }
          >
            {getTime(message.timestamp)}
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={message.timestamp + "-" + index}
          className={
            "flex items-center cursor-default border-b border-[#cbcdd1] dark:border-[#4a4c50]" +
            (isFocusIn && highlightIndex === index
              ? " bg-[#1d73e8] dark:bg-[#0f639c]"
              : highlightIndex === index
              ? " bg-[#dadcd0] dark:bg-[#454545]"
              : " bg-[#ffffff] dark:bg-[#202124]")
          }
          onClick={() => setHighlightIndex(index)}
        >
          <div className="flex flex-1 items-center overflow-hidden border-r border-[#cbcdd1] dark:border-[#4a4c50]">
            <span
              className={
                "material-symbols-rounded text-sm font-bold mx-1 rotate-180" +
                (isFocusIn && highlightIndex === index
                  ? " text-[#ffffff] dark:text-[#000000]"
                  : " text-[#ef432f] dark:text-[#ed4f4c]")
              }
            >
              arrow_upward
            </span>
            <span
              className={
                "whitespace-nowrap overflow-hidden text-ellipsis" +
                (isFocusIn && highlightIndex === index
                  ? " text-[#ffffff] dark:text-[#ffffff]"
                  : " text-[#303942] dark:text-[#bec6cf]")
              }
            >
              {JSON.stringify(message.data)}
            </span>
          </div>
          <div
            className={
              "px-1 w-24 font-mono" +
              (isFocusIn && highlightIndex === index
                ? " text-[#ffffff] dark:text-[#ffffff]"
                : " text-[#303942] dark:text-[#bec6cf]")
            }
          >
            {getTime(message.timestamp)}
          </div>
        </div>
      );
    }
  };

  return (
    <Tab.Panel className="flex flex-col h-full mt-[1px]">
      <div
        className={
          "flex items-center cursor-default text-[#303942] dark:text-[#bec6cf] bg-[#f1f3f4] dark:bg-[#292a2b] border-b border-[#cbcdd1] dark:border-[#4a4c50]"
        }
      >
        <div className="flex flex-1 items-center py-0.5 px-1 border-r border-[#cbcdd1] dark:border-[#4a4c50]">
          Data
        </div>
        <div className={"py-0.5 px-1 w-24"}>Time</div>
      </div>
      <div className="overflow-y-auto border border-[#cbcdd1] dark:border-[#4a4c50]">
        {requestRow ? (
          <VirtualList
            data={requestRow.messages}
            currentIndex={highlightIndex ?? 0}
            renderItem={renderItem}
            style={{ height: "calc(50vh - 20px - 24px - 26px * 2 - 4px)" }}
            onDone={handleDone}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex-1"></div>
      {currentData && (
        <div className="h-[50vh] border border-[#cbcdd1] dark:border-[#4a4c50] bg-[#ffffff] dark:bg-[#202124]">
          <div className="h-full overflow-y-auto">
            <MessageData data={currentData}></MessageData>
          </div>
        </div>
      )}
    </Tab.Panel>
  );
};

export default TabPanelMessages;
