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
    if (changes.measurementData) {
      let measurements = changes.measurementData.currentValue;
      this._$scope.measurements = this.buildMeasurementData(measurements);
      this._$scope.currentMeasurement =
        this._$scope.measurements && this._$scope.measurements[0];
    }
  }

  buildMeasurementData(measurements) {
    let data = Object.keys(measurements).map(key => ({
      category: key,
      desc: measurements[key].desc,
      items: measurements[key].items
    }));

    //remove categoris which have no items
    _.remove(data, o => o.items && o.items.length === 0);

    return data;
  }

  // choose measurement category
  chooseMeasurement(measurement) {
    this._$scope.currentMeasurement = measurement;
  }
}
