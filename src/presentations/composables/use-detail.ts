import { Detail } from "@/entities/detail";
import { resolve, Tokens } from "@/service-locator";
import { useEffect, useState } from "react";

const useDetail = () => {
  const detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource);
  const [detail, setDetail] = useState<Detail>(detailInMemoryDataSource.get());
  useEffect(() => {
    return detailInMemoryDataSource.subscribe((detail) => {
      setDetail(detail);
    }).unsubscribe;
  }, []);

  const setDetail2 = (detail: Detail) => {
    detailInMemoryDataSource.patch(detail);
  };

  return [detail, setDetail2] as const;
};

export default useDetail;
