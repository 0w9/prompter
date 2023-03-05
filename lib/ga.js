export const GA_TRACKING_ID = "G-KGYZFNWVTNT";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, params }) => {
  if (window !== undefined) {
    window.gtag("event", action, params);
  }
};