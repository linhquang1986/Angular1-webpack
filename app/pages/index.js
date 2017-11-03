import angular from "angular";
import about from "./about";
import comparision from "./comparision";
import filterCompare from "./filterCompare";
import landing from "./landing";
import productReview from "./productReview";

export default angular.module("app.pages", [
  about.name,
  comparision.name,
  landing.name,
  productReview.name,
  filterCompare.name
]);
