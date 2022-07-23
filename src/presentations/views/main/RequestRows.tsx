import React, { useCallback, useMemo, useRef } from "react";
import { useWindowSize } from "react-use";
import RequestRow from "./request-rows/RequestRow";
import { resolve, Tokens } from "@/service-locator";
import useRequestRows from "@/presentations/composables/use-request-rows";
import useFilter from "@/presentations/composables/use-filter";
import { RequestRow as IRequestRow } from "@/entities/request-row";
import { getClassName as _getClassName } from "./request-rows/get-class-name";
import useIsFocusIn from "@/presentations/composables/use-is-focus-in";
import useDetail from "@/presentations/composables/use-detail";
import VirtualList from "@/presentations/components/VirtualList";

const RequestRows = ({
  className,
  headerHeight,
}: {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  headerHeight: number;
}) => {
  const filterRepo = resolve(Tokens.FilterRepo);

  const [requestRows] = useRequestRows();

  const [filter] = useFilter();

  const filteredRequestRows = useMemo(() => {
    try {
      const filter = filterRepo.get();

      const test =
        filter.text.startsWith("/") &&
        filter.text.length >= 2 &&
        filter.text.endsWith("/")
          ? (s: string) =>
              RegExp(
                filter.text.slice(1, -1),
                filter.caseSensitive ? undefined : "i"
              ).test(s)
          : (s: string) =>
              filter.caseSensitive
                ? s.includes(filter.text)
                : s.toLowerCase().includes(filter.text.toLowerCase());

      return requestRows.filter(({ methodName }) => {
        if (filter.text.length === 0) return true;

        if (filter.invert === false) {
          return test(methodName);
        } else {
          return test(methodName) === false;
        }
      });
    } catch (error) {
      return [];
    }
  }, [requestRows, filter]);

  const windowSize = useWindowSize();

  const [detail, setDetail] = useDetail();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFocus = useIsFocusIn({
    ref: wrapperRef,
    initialValue: document.hasFocus(),
  });

  const getClassName = (requestRow: undefined | IRequestRow, index: number) => {
    const isActive = detail.requestId === requestRow?.id;
    const isError = !!requestRow?.errorMetadata;
    const isOdd = index % 2 === 1;

    return [
      "flex",
      "flex-row",
      "select-none",
      !isActive && "hover:bg-[#192438]",
      ..._getClassName({
        isWindowFocus: isFocus,
        isActive,
        isError,
        isOdd,
      }),
    ].join(" ");
  };

  const renderItem = (index: number) =>
    typeof filteredRequestRows[index] !== "undefined" ? (
      <RequestRow
        key={filteredRequestRows[index]!.id}
        requestRow={filteredRequestRows[index]!}
        className={getClassName(filteredRequestRows[index], index)}
        onClick={() =>
          setDetail({
            ...detail,
            requestId: filteredRequestRows[index]!.id,
          })
        }
      ></RequestRow>
    ) : (
      <></>
    );

  const currentIndex = useMemo(
    () =>
      filteredRequestRows.findIndex(
        (requestRow) => requestRow.id === detail.requestId
      ),
    [filteredRequestRows, detail]
  );
  const handleDone = useCallback(
    (index: number) => {
      const requestRow = filteredRequestRows[index];
      if (requestRow) {
        setDetail({
          ...detail,
          requestId: requestRow.id,
        });
      }
    },
    [filteredRequestRows, setDetail]
  );

  return (
    <div
      ref={wrapperRef}
      className={"flex flex-col h-full border border-[#4a4c50] " + className}
    >
      {requestRows.length ? (
        <VirtualList
          data={filteredRequestRows}
          currentIndex={currentIndex}
          renderItem={renderItem}
          style={{ height: windowSize.height - headerHeight - 2 }}
          onDone={handleDone}
        />
      ) : (
        <div className="absolute flex justify-center items-center w-full h-full">
          Recording gRPC activity...
        </div>
      )}
    </div>
  );
};

export default RequestRows;
