type UnaryRequestRow = {
  type: "unary";
  id: string;
  methodName: string;
  requestMessage: Record<string, unknown>;
  responseMessage?: Record<string, unknown>;
  error?: Error;
};

type StreamRequestRow = {
  type: "stream";
  id: string;
  methodName: string;
  requestMessage: Record<string, unknown>;
  responseMessages?: Record<string, unknown>[];
  error?: Error;
};

export type RequestRow = UnaryRequestRow | StreamRequestRow;
