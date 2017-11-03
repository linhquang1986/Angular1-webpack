export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //default data
    const orientations = ["LANDSCAPE", "PORTRAIT"];
    this._$scope.data = {};

    // default config
    this._$scope.config = {
      orientation: $attrs.orientation || orientations[0]
    };
  }

  $onChanges(changes) {
    if (changes.scoringData && changes.scoringData.currentValue) {
      this._$scope.data = changes.scoringData.currentValue;
    }
  }
}
