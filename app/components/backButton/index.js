import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.backButton", [])
  .component("backButton", {
    template,
    controller: controller
  });
