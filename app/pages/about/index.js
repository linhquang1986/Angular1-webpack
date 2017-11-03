import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.pages.about", [])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/about-page", {
        template,
        controller: controller
      });
    }
  ])
  .controller("AboutPageCtrl", controller);
