import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonAddModelTabContent", [])
  .component("comparisonAddModelTabContent", {
    template,
    controller: controller,
    bindings: {
      productType: "<",
      productList: "<"
    }
  });
