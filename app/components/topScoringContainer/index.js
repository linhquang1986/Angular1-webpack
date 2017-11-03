import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.topScoringContainer", [])
  .component("topScoringContainer", {
    template,
    controller: controller,
    bindings: { category: "<" }
  });
