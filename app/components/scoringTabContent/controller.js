export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //default data
    this._$scope.product = {};
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
      this._$scope.scoringData = {
        id: this._$scope.product.id,
        image: this._$scope.product.image,
        title: this._$scope.product.scoreTitle,
        type: this._$scope.product.typeName,
        overallScore: this._$scope.product.overallScore,
        product_scores:
          (this._$scope.product.scores && this._$scope.product.scores.scores) ||
          []
      };
    }
  }
}
