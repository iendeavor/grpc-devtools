import React, { useMemo } from "react";
import RequestDetail from "./main/RequestDetail";
import RequestRows from "./main/RequestRows";
import { RequestRow } from "@/entities/request-row";
import useDetail from "@/presentations/composables/use-detail";
import useRequestRows from "@/presentations/composables/use-request-rows";

const Main = ({ headerHeight }: { headerHeight: number }) => {
  const [detail, setDetail] = useDetail();
  const setFirstRequestRowAsDetailIfMissing = (requestRows: RequestRow[]) => {
    if (requestRows.length === 0) return;
    if (detail.requestId !== null) return;
    setDetail({
      ...detail,
      requestId: requestRows[0]!.id,
    });
  };
  const isDetailVisible = useMemo(() => detail.requestId !== null, [detail]);

  const [requestRows] = useRequestRows();
  setFirstRequestRowAsDetailIfMissing(requestRows);

  return (
    <main className="flex flex-col bg-background-elevation-1 overflow-y-auto">
      <div className="flex flex-row">
        <RequestRows
          headerHeight={headerHeight}
          className="min-w-[30%]"
        ></RequestRows>
        {isDetailVisible && <RequestDetail></RequestDetail>}
      </div>
    </main>
  );
};

export default Main;
