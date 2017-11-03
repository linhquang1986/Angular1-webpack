import { parseParamFromUrl } from "utils/helper";
export default angular
  .module("app.factories.sessionInterceptor", [])
  .factory("sessionInterceptor", function($q, $injector) {
    "ngInject";

    let IS_REGISTER_TOKEN = false;
    return {
      request: function(req) {
        let deferred = $q.defer();
        let constraintService = $injector.get("constraintService");
        let params = parseParamFromUrl(req.url);
        let token = new String(params.accesstoken).toString();

        //dont handle anything if this is get angular template request
        const IS_GET_TEMPLATE =
          params.href && params.href.indexOf(constraintService.baseUrl) === -1;

        //add siteType into url
        if (!IS_GET_TEMPLATE && constraintService.siteType) {
          req.url =
            req.url +
            (req.url.indexOf("?") === -1 ? "?" : "&") +
            "sitetype=" +
            constraintService.siteType;
        }

        // send request if exist token
        if (
          IS_GET_TEMPLATE ||
          (!!token && token !== "null" && token !== "undefined")
        )
          deferred.resolve(req);
        else {
          //do not prevent if req is register token request
          if (
            req.url.indexOf(
              constraintService.baseUrl + constraintService.baseApi + "register"
            ) !== -1
          ) {
            deferred.resolve(req);
          } else {
            // else reject request
            deferred.reject(req);
          }
        }
        return deferred.promise;
      },

      response: function(res) {
        if (res && res.data && res.data.code === 2) {
          let deferred = $q.defer();
          let http = $injector.get("$http");
          let authService = $injector.get("authService");
          let constraintService = $injector.get("constraintService");
          authService.refreshToken();
        } else return res;
      }
    };
  });
