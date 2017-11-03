import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.brandModelSelector", [])
  .component("brandModelSelector", {
    template,
    controller: controller,
    bindings: {
      categoryId: "<",
      onBrandSelect: "&",
      onModelSelect: "&",
      optionDropdown: "<",
      inline: "<"
    }
  });
