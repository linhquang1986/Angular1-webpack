export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;

    //default data
    this._$scope.product = {};
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
    }
  }
}
