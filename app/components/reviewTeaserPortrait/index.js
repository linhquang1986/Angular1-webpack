import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.reviewTeaserPortrait", [])
  .component("reviewTeaserPortrait", {
    template,
    controller: controller,
    bindings: { product: "<" }
  });
