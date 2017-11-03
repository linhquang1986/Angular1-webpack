export default class {
  constructor($scope, $window) {
    "ngInject";
    this._$scope = $scope;

    //bind methods to scope

    //default data
    this._$scope.product = {}
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
      this._$scope.specs = this.getSpecs(this._$scope.product);
      _.map(this._$scope.specs, function(spec) {
        let specVal = spec.value
        if (specVal.includes('http') || specVal.includes('https')){
          spec.isLink = true
        } else {
          spec.isLink = false
        }
        return spec;
      });
    }
  }

  getSpecs(product) {
    if (!product) return;
    return (product.specification && product.specification.features) || [];
  }
}
