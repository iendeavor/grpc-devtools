import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { Virtuoso } from "react-virtuoso";
import RequestRow from "./request-rows/RequestRow";
import { resolve, Tokens } from "@/service-locator";
import useRequestRows from "@/presentations/composables/use-request-rows";

const RequestRows = ({
  className,
  headerHeight,
}: {
  className?: React.HTMLAttributes<HTMLElement>["className"];
  headerHeight: number;
}) => {
  const filterRepo = resolve(Tokens.FilterRepo);

  const [requestRows] = useRequestRows();

  const [filter, setFilter] = useState(filterRepo.get());
  useEffect(() => {
    return filterRepo.subscribe((filter) => setFilter(filter)).unsubscribe;
  }, []);

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

        if (filter.invert === false) {
          return test(request.methodDescriptor.name);
        } else {
          return test(request.methodDescriptor.name) === false;
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

  return (
    <div className={"flex flex-col border border-primary-border " + className}>
      <Virtuoso
        style={{ height: windowSize.height - headerHeight - 2 }}
        totalCount={filteredRequestRows.length}
        itemContent={(index) =>
          typeof filteredRequestRows[index] !== "undefined" ? (
            <RequestRow
              key={filteredRequestRows[index]!.id}
              requestRow={filteredRequestRows[index]!}
              className={
                "flex flex-row text-sm hover:text-text-primary" +
                (activeId === filteredRequestRows[index]!.id
                  ? " text-text-primary bg-[rgb(50_110_180)]"
                  : " hover:bg-primary/10") +
                (index % 2 ? " bg-background" : " bg-background-elevation-1")
              }
              onClick={() => setActiveId(filteredRequestRows[index]!.id)}
            ></RequestRow>
          ) : (
            <></>
          )
        }
      />
    </div>
  );
};

export default RequestRows;
