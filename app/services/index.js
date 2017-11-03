import angular from "angular";
import product from "./product";
import mockData from "./mockData";
import constraint from "./constraint";
import auth from "./auth";
import network from "./network";
import homepage from "./homepage";

export default angular.module("app.services", [
  product.name,
  mockData.name,
  constraint.name,
  auth.name,
  network.name,
  homepage.name
]);
