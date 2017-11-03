import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisionTable", [])
  .component("comparisionTable", {
    template,
    controller: controller,
    bindings: {
      models: "="
    }
  });
