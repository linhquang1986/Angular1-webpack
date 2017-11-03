import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.categoryCarousel", [])
  .component("categoryCarousel", {
    template,
    controller: controller,
    bindings: {
      categoryId: "=",
      color: "@"
    }
  });
