export default class {
  constructor($scope, $window) {
    "ngInject";
    this._$scope = $scope;
    this._$window = $window;

    //bind methods to scope
    this._$scope.back = this.back.bind(this);

    //default data
  }

  back() {
    this._$window && this._$window.history.back();
  }
}
