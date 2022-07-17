export type Detail = {
  currentTab: typeof tabs[number];
  requestId: null | string;
};

export const tabs = ["headers", "request", "preview", "response"] as const;
