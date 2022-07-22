import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { Virtuoso } from "react-virtuoso";
import RequestRow from "./request-rows/RequestRow";
import { resolve, Tokens } from "@/service-locator";
import useRequestRows from "@/presentations/composables/use-request-rows";
import useFilter from "@/presentations/composables/use-filter";
import { RequestRow as IRequestRow } from "@/entities/request-row";
import { getClassName as _getClassName } from "./request-rows/get-class-name";

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

  const [activeId, setActiveId] = useState<null | string>(null);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        // setActiveId(null);
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const [isWindowFocus, setIsWindowFocus] = useState(document.hasFocus());
  useEffect(() => {
    const handleWindowFocus = () => {
      setIsWindowFocus(true);
    };
    const handleWindowBlur = () => {
      setIsWindowFocus(false);
    };
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("blur", handleWindowBlur);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  const getClassName = (requestRow: undefined | IRequestRow, index: number) => {
    const isActive = activeId === requestRow?.id;
    const isError = !!requestRow?.error;
    const isOdd = index % 2 === 1;

    return [
      "flex",
      "flex-row",
      "text-sm",
      "select-none",
      !isActive && "hover:bg-[#192438]",
      ..._getClassName({
        isWindowFocus,
        isActive,
        isError,
        isOdd,
      }),
    ].join(" ");
  };

  return (
    <div
      className={
        "flex flex-col border border-primary-border bg-[#202124] " + className
      }
    >
      {requestRows.length ? (
        <Virtuoso
          style={{ height: windowSize.height - headerHeight - 2 }}
          totalCount={filteredRequestRows.length}
          itemContent={(index) =>
            typeof filteredRequestRows[index] !== "undefined" ? (
              <RequestRow
                key={filteredRequestRows[index]!.id}
                requestRow={filteredRequestRows[index]!}
                className={getClassName(filteredRequestRows[index], index)}
                onClick={() => setActiveId(filteredRequestRows[index]!.id)}
              ></RequestRow>
            ) : (
              <></>
            )
          }
        />
      ) : (
        <div className="m-auto">Recording gRPC activity...</div>
      )}
    </div>
  );
};

export default RequestRows;
