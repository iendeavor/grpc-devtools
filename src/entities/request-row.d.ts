export type RequestRow = {
  id: string;
  type: "unary";
  request: {
    methodDescriptor: {
      name: string;
    };
    requestMessage: Record<string, unknown>;
  };
  response?: {
    methodDescriptor: {
      name: string;
    };
    responseMessage: Record<string, unknown>;
  };
};
