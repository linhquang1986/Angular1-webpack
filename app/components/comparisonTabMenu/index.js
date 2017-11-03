import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonTabMenu", [])
  .component("comparisonTabMenu", {
    template,
    controller: controller,
    bindings: { sharedData: "<" }
  });
