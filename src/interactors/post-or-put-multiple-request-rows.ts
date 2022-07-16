import { RequestRow } from "@/entities/request-row";
import { resolve, Tokens } from "@/service-locator";

export const postOrPutMultipleRequestRows = ({
  requestRows,
}: {
  requestRows: RequestRow[];
}) => {
  const configRepo = resolve(Tokens.ConfigRepo);
  if (configRepo.get().shouldRecord === false) return;

  const requestRowsRepo = resolve(Tokens.RequestRowsRepo);
  requestRowsRepo.postOrPutMultiple({ requestRows });
};
