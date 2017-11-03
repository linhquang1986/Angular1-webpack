import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.scoringTabContent", [])
  .component("scoringTabContent", {
    template,
    controller: controller,
    bindings: { product: "<" }
  });
