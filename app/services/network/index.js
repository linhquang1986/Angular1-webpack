import angular from "angular";
import { getLS, saveLS, removeLS } from "utils/localStorage";
import CONSTANT from "resources/constant";

export default angular
  .module("app.services.networkService", [])
  .service("networkService", function($http, authService) {
    "ngInject";

    return {};
  });
