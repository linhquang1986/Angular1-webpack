import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular.module("app.pages.landing", ["rzModule"]).config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/landing-page", {
      template,
      controller: controller
    });
  }
]);
