import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.specificationTabContent", [])
  .component("specificationTabContent", {
    template,
    controller: controller,
    bindings: {
      product: "<"
    }
  });
