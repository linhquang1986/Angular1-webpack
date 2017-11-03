import angular from "angular";
import { formatDate } from "utils/helper";

export default class {
  constructor($attrs, $scope, $location) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;
    this._$location = $location;

    //bind methods to scope
    this._$scope.openProductReview = this.openProductReview.bind(this);

    //default data
    this._$scope.product = {};
    this._$scope.publishDate = "";
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
      this._$scope.publishDate = formatDate(this._$scope.product.publishDate);
    }
  }

  //handle route to product review page
  openProductReview() {
    if (!this._$scope.product.id)
      return new Error("Must be provided product id to route");
    this._$location
      .path("/productreview-page")
      .search({ productId: this._$scope.product.id });
  }
}
