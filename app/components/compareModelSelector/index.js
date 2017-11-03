import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.compareModelSelector", [])
  .component("compareModelSelector", {
    template,
    controller: controller,
    bindings: {
      productType: "<",
      product: "<"
    }
  });
