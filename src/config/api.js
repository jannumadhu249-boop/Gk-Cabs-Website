// API Configuration
export const base_url = 'https://api.gkcabs.com/';
export const BASE_URL = base_url;

export const API_ENDPOINTS = {
  Base: base_url,
  ImageUrl: base_url,

  CONTACT: base_url + "v1/gkcabs/web/get-contactus",
  ENQUIRY: base_url + "v1/gkcabs/web/enquiry/addenquiry",
  HOME_SCREEN: base_url + "v1/gkcabs/web/get-home-screen",
  SAFETY_DATA: base_url + "v1/gkcabs/web/getsafetydata",
  ABOUT_US: base_url + "v1/gkcabs/web/get-about-us",
  GALLERY: base_url + "v1/gkcabs/web/getallgallery",
  
};

// Global in-memory cache and promise deduplication for home screen data (pure API data)
let homeDataCache = null;
let homeDataPromise = null;

export const getCachedHomeData = () => homeDataCache;

export const getHomeScreenData = () => {
  if (homeDataCache) {
    return Promise.resolve(homeDataCache);
  }
  if (!homeDataPromise) {
    homeDataPromise = fetch(API_ENDPOINTS.HOME_SCREEN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success) {
          homeDataCache = data;
        }
        return data;
      })
      .catch((err) => {
        homeDataPromise = null; // Allow retry on failure
        console.error('Error fetching home screen data:', err);
        throw err;
      });
  }
  return homeDataPromise;
};

export default base_url;