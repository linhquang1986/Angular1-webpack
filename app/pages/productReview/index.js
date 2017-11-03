import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular.module("app.pages.productReview", ["rzModule"]).config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/productreview-page", {
      template,
      controller: controller
    });
  }
]);
