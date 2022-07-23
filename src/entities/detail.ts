export type Detail = {
  currentTab: typeof tabs[number];
  requestId: null | string;
  headers: {
    focusIndex: number;
  };
};

export const tabs = ["headers", "messages"] as const;
