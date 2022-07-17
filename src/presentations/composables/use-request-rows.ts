import { RequestRow } from "@/entities/request-row";
import { resolve, Tokens } from "@/service-locator";
import { useEffect, useState } from "react";

const useRequestRows = () => {
  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  const [requestRows, setRequestRows] = useState<RequestRow[]>(
    requestRowsRepo.getAll()
  );
  useEffect(() => {
    const subscription = requestRowsRepo.subscribe((requestRows) => {
      setRequestRows(requestRows);
    });
    return () => subscription.unsubscribe();
  }, []);

  const setRequestRows2 = (requestRows: RequestRow[]) => {
    requestRowsRepo.postOrPutMultiple({ requestRows });
  };

  return [requestRows, setRequestRows2] as const;
};

export default useRequestRows;
