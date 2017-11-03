export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;

    //default data
    this._$scope.products = [];
  }
  $onChanges(changes) {
    if (changes.products) {
      this._$scope.products = changes.products.currentValue;
    }
  }
}
