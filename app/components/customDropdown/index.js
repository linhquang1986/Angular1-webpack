import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.customDropdown", [])
  .component("customDropdown", {
    template,
    controller: controller,
    bindings: {
      items: "<",
      onSelect: "&",
      placeholder: "@",
      itemDefault: "<",
      options: "<"
    }
  });
