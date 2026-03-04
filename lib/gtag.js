// Google Analytics Tracking ID
export const GA_TRACKING_ID = "G-XXXXXXXXXX" // Replace with your actual Google Analytics tracking ID

// Google Analytics functions
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Dynamically define the gtag property on the window object
if (typeof window !== "undefined" && !window.gtag) {
  window.gtag = function () {
    console.log("gtag function called with arguments:", arguments);
  };
}
