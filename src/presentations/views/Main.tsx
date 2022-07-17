import React, { useEffect, useMemo } from "react";
import RequestDetail from "./main/RequestDetail";
import RequestRows from "./main/RequestRows";
import { RequestRow } from "@/entities/request-row";
import useDetail from "@/presentations/composables/use-detail";
import useRequestRows from "@/presentations/composables/use-request-rows";

const Main = ({ headerHeight }: { headerHeight: number }) => {
  const [detail, setDetail] = useDetail();
  const [requestRows] = useRequestRows();
  useEffect(() => {
    setFirstRequestRowAsDetailIfMissing(requestRows);
  }, [requestRows]);
  const setFirstRequestRowAsDetailIfMissing = (requestRows: RequestRow[]) => {
    if (requestRows.length === 0) return;
    if (detail.requestId !== null) return;
    setDetail({
      ...detail,
      requestId: requestRows[0]!.id,
    });
  };
  useEffect(() => {
    resetDetailRequestIdIfRequestRowsIsEmpty();
  }, [requestRows]);
  const resetDetailRequestIdIfRequestRowsIsEmpty = () => {
    if (requestRows.length) return;
    if (detail.requestId === null) return;
    setDetail({
      ...detail,
      requestId: null,
    });
  };

  const isDetailVisible = useMemo(() => detail.requestId !== null, [detail]);

  return (
    <main className="flex flex-col bg-background-elevation-1 overflow-y-auto">
      <div className="flex flex-row">
        <RequestRows
          headerHeight={headerHeight}
          className={isDetailVisible ? "min-w-[30%]" : "w-full"}
        ></RequestRows>
        {isDetailVisible && <RequestDetail></RequestDetail>}
      </div>
    </main>
  );
};

export default Main;
