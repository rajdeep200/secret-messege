import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();


export const GA_MEASUREMENT_ID = publicRuntimeConfig.GA_MEASUREMENT_ID;
console.log('GA_MEASUREMENT_ID', GA_MEASUREMENT_ID)
export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
