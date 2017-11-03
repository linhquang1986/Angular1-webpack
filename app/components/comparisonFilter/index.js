import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonFilter", [])
  .component("comparisonFilter", {
    template,
    controller: controller,
    bindings: {
      categoryId: "=",
      models: "="
    }
  });
