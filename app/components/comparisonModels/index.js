import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonModels", [])
  .component("comparisonModels", {
    template,
    controller: controller,
    bindings: {
      event: "<",
      models: "<",
      onDelete: "&",
      onSubmit: "&"
    }
  });
