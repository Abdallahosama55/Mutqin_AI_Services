export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export const actionsTypes = {
  TOGGLE_HISTORY_PANEL: "TOGGLE_HISTORY_PANEL",
  TOGGLE_HISTORY_PANEL_FALSE: "TOGGLE_HISTORY_PANEL_FALSE",
};

export const API_URL = "https://backend.mutqinai.com/api/v1";

export const BEARER_TOKEN = localStorage.getItem("token");
