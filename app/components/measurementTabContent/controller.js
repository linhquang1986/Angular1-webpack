export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //bind methods to scope
    this._$scope.chooseMeasurement = this.chooseMeasurement.bind(this);

    //default data
    this._$scope.product = {};
    this._$scope.measurements = [];
    this._$scope.currentMeasurement = {};
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
      this._$scope.measurements = this.getMeasurementsData();
      this._$scope.currentMeasurement =
        this._$scope.measurements && this._$scope.measurements[0];
    }
  }

  // choose measurement category
  chooseMeasurement(measurement) {
    this._$scope.currentMeasurement = measurement;
  }
  // get measurement data
  getMeasurementsData() {
    return this._$scope.product && this._$scope.product.measurements;
  }
}
