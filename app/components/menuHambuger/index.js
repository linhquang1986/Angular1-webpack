import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.menuHambuger", [])
  .component("menuHambuger", {
    template,
    controller: controller
  });
