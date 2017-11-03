import angular from "angular";
import secretConfig from "app/config/secret";
import { getLS, saveLS } from "utils/localStorage";

import CONSTANT from "resources/constant";
import SITE from "config/site";

export default angular
  .module("app.services.constraintService", [])
  .service("constraintService", function($injector) {
    "ngInject";

    let constraint = {
      baseUrl: SITE.baseUrl,
      baseApi: SITE.baseApi,
      apikey: secretConfig.API_KEY,
      accesstoken: getTokenFromLocal(),
      siteType: SITE.siteType,
      setToken: setToken
    };

    function getTokenFromLocal() {
      let savedToken = getLS(CONSTANT.ACCESS_TOKEN);
      //register new token if not saved before
      if (!savedToken) {
        setTimeout(() => {
          let authService = $injector.get("authService");
          authService.refreshToken();
        }, 0);
      } else return savedToken;
    }
    function setToken(token, opt = {}) {
      let options = { reload: true };
      options = { ...options, ...opt };
      saveLS(CONSTANT.ACCESS_TOKEN, token);
      token && (constraint.accesstoken = token);

      //reload page after update new token
      options.reload && window.location.reload();
    }

    return constraint;
  });
