import angular from "angular";
import controller from "./controller";
import template from "./template.html";
import "./style.scss";

export default angular
  .module("app.components.scoringBarDetail", [])
  .component("scoringBarDetail", {
    template,
    controller: controller,
    bindings: { scoringData: "<" }
  });
