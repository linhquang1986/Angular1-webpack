import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular.module("app.pages.comparision", []).config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/comparison-page", {
      template,
      controller: controller
    });
  }
]);
