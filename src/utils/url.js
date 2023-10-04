import { APP_CONFIG } from 'app/config';

// return absolute image url
export function absImageUrl(url) {
  if (url?.indexOf('http://') !== 0 && url?.indexOf('https://') !== 0) {
    return `${APP_CONFIG.API_BASE_URL}${url}`;
  }

  return url;
}
