import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.exploreProduct", [])
  .component("exploreProduct", {
    template,
    controller: controller
  });
