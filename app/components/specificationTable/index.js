import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.specificationTable", [])
  .component("specificationTable", {
    template,
    controller: controller,
    bindings: {
      product: "<"
    }
  });
