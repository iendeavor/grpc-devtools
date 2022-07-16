import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useState } from "react";
import RequestDetail from "./body/RequestDetail";
import RequestRows from "./body/RequestRows";
import { RequestRow } from "@/entities/request-row";

const Main = ({ headerHeight }: { headerHeight: number }) => {
  const detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource);
  const [id, setId] = useState<null | string>(null);
  useEffect(() => {
    return detailInMemoryDataSource.subscribe((detail) => {
      setId(detail.requestId);
    }).unsubscribe;
  }, []);

  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  const setFirstRequestRowAsDetailIfMissing = (requestRows: RequestRow[]) => {
    if (requestRows.length === 0) return;
    if (id !== null) return;
    detailInMemoryDataSource.patch({
      requestId: requestRows[0]!.id,
    });
  };
  setFirstRequestRowAsDetailIfMissing(requestRowsRepo.getAll());
  useEffect(() => {
    return requestRowsRepo.subscribe(() => void 0).unsubscribe;
  }, []);

  const isDetailVisible = id !== null;

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
