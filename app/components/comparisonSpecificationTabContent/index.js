import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonSpecificationTabContent", [])
  .component("comparisonSpecificationTabContent", {
    template,
    controller: controller,
    bindings: { products: "<" }
  });
