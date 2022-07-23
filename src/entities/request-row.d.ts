export type RequestRow = {
  id: string;
  type: "unary";
  request: {
    metadata: Record<string, string>;
    methodDescriptor: {
      name: string;
    };
    requestMessage: Record<string, unknown>;
  };
  response?: {
    metadata: Record<string, string>;
    methodDescriptor: {
      name: string;
    };
    responseMessage: Record<string, unknown>;
  };
  error?: {
    metadata: Record<string, string>;
    methodDescriptor: {
      name: string;
    };
    code: string;
    message: string;
  };
};
