import React, { useEffect, useMemo } from "react";
import RequestDetail from "./main/RequestDetail";
import RequestRows from "./main/RequestRows";
import useDetail from "@/presentations/composables/use-detail";
import useRequestRows from "@/presentations/composables/use-request-rows";
import { usePrevious } from "react-use";

const Main = ({ headerHeight }: { headerHeight: number }) => {
  const [detail, setDetail] = useDetail();
  const [requestRows] = useRequestRows();
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

  const previousDetail = usePrevious(detail);
  useEffect(() => {
    if (previousDetail?.requestId === detail.requestId) return;
    setDetail({
      ...detail,
      headers: {
        ...detail.headers,
        focusIndex: 0,
      },
    });
  }, [previousDetail, detail]);

  const isDetailVisible = useMemo(() => detail.requestId !== null, [detail]);

  return (
    <main className="flex flex-col bg-[#202124] overflow-y-auto">
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
