import angular from "angular";
import controller from "./controller";
import template from "./template.html";

export default angular
  .module("app.components.comparisonScoringTabContent", [])
  .component("comparisonScoringTabContent", {
    template,
    controller: controller,
    bindings: {
      scoringData: "<"
    }
  });
