import angular from "angular";
import CONSTANT from "resources/constant";
import { removeLS } from "utils/localStorage";

//we want to know "refreshToken" is called or not
let isGetToken = false;

export default angular
  .module("app.services.authService", [])
  .service("authService", function($http, constraintService) {
    "ngInject";

    function removeTokenLocal() {
      removeLS(CONSTANT.ACCESS_TOKEN);
    }

    function checkTokenExpired(min) {
      setInterval(() => {
        obj.refreshToken({ reload: false });
      }, min * 60 * 1000);
    }

    let obj = {
      refreshToken: function(opt = {}) {
        let onSuccess = res => {
          let token = res.data && res.data.data && res.data.data.accesstoken;
          constraintService.setToken(token, opt);
          isGetToken = false;
          return token;
        };
        let onFail = err => {
          //TO DO: alert to user
          isGetToken = false;
          removeTokenLocal();
        };

        if (!isGetToken) {
          isGetToken = true;

          return $http
            .get(
              constraintService.baseUrl +
                constraintService.baseApi +
                "register?apikey=" +
                constraintService.apikey
            )
            .then(onSuccess, onFail);
        } else {
          return new Promise((resolve, reject) => reject(null));
        }
      }
    };

    checkTokenExpired(1); //re-check token every 1 minute
    return obj;
  });
