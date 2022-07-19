import { Detail } from "@/entities/detail";
import { resolve, Tokens } from "@/service-locator";
import { useEffect, useState } from "react";

const useDetail = () => {
  const detailRepo = resolve(Tokens.DetailRepo);
  const [detail, setDetail] = useState<Detail>(detailRepo.get());
  useEffect(() => {
    const subscription = detailRepo.subscribe((detail) => {
      setDetail(detail);
    });
    return () => subscription.unsubscribe();
  }, []);

  const setDetail2 = (detail: Detail) => {
    detailRepo.patch(detail);
  };

  return [detail, setDetail2] as const;
};

export default useDetail;
