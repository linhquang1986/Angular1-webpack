export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //default data
    this._$scope.scoringData = [];
  }

  $onChanges(changes) {
    if (changes.scoringData)
      this._$scope.scoringData = changes.scoringData.currentValue;
  }
}
