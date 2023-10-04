import appConfig from '../appconfig.json';

const hostname = window.location.hostname;

const isLocalHost = () => {
  return !!(
    hostname.indexOf('localhost') > -1 ||
    hostname === '[::1]' ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
};

const containsHost = () =>{

}

export default {
    DEFAULT_TENANT: -2,
    baseURL: appConfig.baseURL || "http://localhost:4500",
    assetURL: "http://localhost:4500/",
    assetURLcategory: "https://api.ktmkart.com/asset/upload/",
    httpAssetURL: appConfig.httpAssetURL,
    appname: appConfig.appName,
    mail: appConfig.mail,
    website: appConfig.website,
    amazonUrl : appConfig.amazonUrl
}