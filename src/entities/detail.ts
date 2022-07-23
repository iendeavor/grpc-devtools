export type Detail = {
  currentTab: typeof tabs[number];
  requestId: null | string;
  headers: {
    focusIndex: number;
  };
};

export const tabs = ["headers", "request", "response", "preview"] as const;
