// uncomment these lines to use analytics id from site data

//import { googleAnalyticsId } from "./siteData"
//const GA_TAG = googleAnalyticsId

// comment this line to use analytics from .env
export const GA_TAG = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || null;

// log the pageview with their URL
export const pageview = (url) => {
  console.log('logging pageview');
  if (process.env.NODE_ENV !== "production"){
    console.log('not in prod ');
    return
  } 
  
  console.log('prod detected', GA_TAG);
  window.gtag("config", GA_TAG, {
    page_path: url,
  })
}

// log specific events happening.
export const logAnalyticsEvent = ({
  action,
  params,
}) => {
  if (process.env.NODE_ENV !== "production"){
    return
  } 

  window.gtag("event", action, params)
}
