import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useMemo } from "react";
import RequestDetail from "./body/RequestDetail";
import RequestRows from "./body/RequestRows";
import { RequestRow } from "@/entities/request-row";
import useDetail from "@/presentations/composables/use-detail";

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

  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  setFirstRequestRowAsDetailIfMissing(requestRowsRepo.getAll());
  useEffect(() => {
    return requestRowsRepo.subscribe(() => void 0).unsubscribe;
  }, []);

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
