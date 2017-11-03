import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular.module("app.pages.filterCompare", ["rzModule"]).config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/filter-compare-page", {
      template,
      controller: controller
    });
    $routeProvider.when("/explore-products-page", {
      template,
      controller: controller
    });
  }
]);
