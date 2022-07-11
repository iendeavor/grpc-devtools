export type RequestRow = {
  id: string;
  type: "unary";
  methodName: string;
  requestMessage: Record<string, unknown>;
  responseMessage?: Record<string, unknown>;
  error?: Error;
};
