import { RequestRow } from "@/entities/request-row";

const key = "grpc-devtools-request-rows";

export class RequestRowsLocalDataSource {
  getAll = (): RequestRow[] => {
    return JSON.parse(sessionStorage.getItem(key) ?? "[]");
  };

  putAll = (requestRows: RequestRow[]): void => {
    sessionStorage.setItem(key, JSON.stringify(requestRows));
  };

  deleteAll = (): void => {
    sessionStorage.removeItem(key);
  };
}
