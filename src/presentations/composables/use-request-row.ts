import { useMemo } from "react";
import useDetail from "./use-detail";
import useRequestRows from "./use-request-rows";

const useRequestRow = () => {
  const [requestRows] = useRequestRows();
  const [detail] = useDetail();

  const requestRow = useMemo(() => {
    return requestRows.find((row) => row.id === detail.requestId) ?? null;
  }, [requestRows, detail]);

  return requestRow;
};

export default useRequestRow;
