import React, { useCallback, useMemo, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import RequestRow from "./request-rows/RequestRow";
import { resolve, Tokens } from "@/service-locator";
import useRequestRows from "@/presentations/composables/use-request-rows";
import useFilter from "@/presentations/composables/use-filter";
import { RequestRow as IRequestRow } from "@/entities/request-row";
import { getClassName as _getClassName } from "./request-rows/get-class-name";
import useIsFocusIn from "@/presentations/composables/use-is-focus-in";
import useDetail from "@/presentations/composables/use-detail";

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

      return requestRows.filter(({ request }) => {
        if (filter.text.length === 0) return true;

        const shortMethodName =
          request.methodDescriptor.name.split("/").pop() ?? "";
        if (filter.invert === false) {
          return test(shortMethodName);
        } else {
          return test(shortMethodName) === false;
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
    const isError = !!requestRow?.error;
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

  const virtusoRef = useRef<VirtuosoHandle>(null);
  const [listRef, setListRef] = useState<HTMLElement | Window | null>(null);
  const handleScrollerKeydown = useCallback(
    (e: KeyboardEvent) => {
      const currentIndex = filteredRequestRows.findIndex(
        (requestRow) => requestRow.id === detail.requestId
      );

      if (e.metaKey && e.key === "ArrowUp") {
        e.preventDefault();
        const firstIndex = 0;
        virtusoRef.current?.scrollIntoView({
          index: firstIndex,
          behavior: "auto",
          done: () => {
            const firstRequestRow = filteredRequestRows[firstIndex];
            if (firstRequestRow) {
              setDetail({
                ...detail,
                requestId: firstRequestRow.id,
              });
            }
          },
        });
      } else if (e.metaKey && e.key === "ArrowDown") {
        e.preventDefault();
        const lastIndex = filteredRequestRows.length - 1;
        virtusoRef.current?.scrollIntoView({
          index: lastIndex,
          behavior: "auto",
          done: () => {
            const lastRequestRow = filteredRequestRows[lastIndex];
            if (lastRequestRow) {
              setDetail({
                ...detail,
                requestId: lastRequestRow.id,
              });
            }
          },
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isFocus === false) return;
        if (currentIndex === -1) return;
        if (currentIndex === 0) return;
        const prevIndex = currentIndex - 1;

        virtusoRef.current?.scrollIntoView({
          index: prevIndex,
          behavior: "auto",
          done: () => {
            const prevRequestRow = filteredRequestRows[prevIndex];
            if (prevRequestRow) {
              setDetail({
                ...detail,
                requestId: prevRequestRow.id,
              });
            }
          },
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isFocus === false) return;
        if (currentIndex === -1) return;
        if (currentIndex === filteredRequestRows.length - 1) return;
        const nextIndex = currentIndex + 1;

        virtusoRef.current?.scrollIntoView({
          index: nextIndex,
          behavior: "auto",
          done: () => {
            const nextRequestRow = filteredRequestRows[nextIndex];
            if (nextRequestRow) {
              setDetail({
                ...detail,
                requestId: nextRequestRow.id,
              });
            }
          },
        });
      }
    },
    [virtusoRef, filteredRequestRows, detail]
  );
  const scrollerRef = React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (element) {
        setListRef(element);
        listRef?.addEventListener("keydown", handleScrollerKeydown as any);
      } else {
        listRef?.removeEventListener("keydown", handleScrollerKeydown as any);
      }
    },
    [handleScrollerKeydown]
  );

  return (
    <div
      ref={wrapperRef}
      className={"flex flex-col h-full border border-[#4a4c50] " + className}
    >
      {requestRows.length ? (
        <Virtuoso
          ref={virtusoRef}
          style={{ height: windowSize.height - headerHeight - 2 }}
          totalCount={filteredRequestRows.length}
          itemContent={(index) =>
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
            )
          }
          scrollerRef={scrollerRef}
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
