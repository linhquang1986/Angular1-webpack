import { mEmit, mOn } from "utils/emiter";

export default class {
  constructor($scope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._productService = productService;

    this.getAllCategories();
  }

  // get product type
  getAllCategories() {
    return this._productService.getProductType().then(res => {
      if (res && res.data) {
        this._$scope.categories = res.data.types;
        return this._$scope.categories;
      }
    });
  }
}
