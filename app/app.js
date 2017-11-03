import angular from "angular";
import services from "services";
import pages from "pages";
import components from "components";
import factories from "factories";

export default angular
  .module("app.mainApp", [
    "ngRoute",
    "ui.bootstrap",
    services.name,
    pages.name,
    components.name,
    factories.name
  ])
  .config([
    "$locationProvider",
    "$routeProvider",
    "$httpProvider",

    function($locationProvider, $routeProvider, $httpProvider) {
      "ngInject";

      $locationProvider.hashPrefix("!");
      $routeProvider.otherwise({ redirectTo: "/landing-page" });
      $httpProvider.interceptors.push("sessionInterceptor");
    }
  ]);
