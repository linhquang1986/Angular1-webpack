//DONT PLACE SENSITIVE DATA HERE, WILL BE PUBLIC
const API_VERSION = "v1";
const HOST = "https://apps.thx.com/thxdata/";

module.exports = {
  apiVersion: API_VERSION,
  baseUrl: HOST,
  baseApi: `api/${API_VERSION}/thxmark/`,
  siteType: SITETYPE_PLACEHOLDER_WEBPACK //config in webpack.common.js
};
