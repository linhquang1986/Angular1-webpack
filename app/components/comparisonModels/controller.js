export default class {
  constructor($scope, $attrs, $location) {
    "ngInject";
    this._$scope = $scope;
    // this._$attrs = $attrs;
    this._$location = $location;

    //bind methods to scope
    this._$scope.removeModel = this.removeModelHandler.bind(this);
    this._$scope.submitCompare = this.submitCompare.bind(this);

    //default data
    this._$scope.models = [];
    this._MAX_MODEL = 3;
  }

  $onInit() {
    try {
      this._$scope.models = _.slice(this.models, 0, this._MAX_MODEL);
    } catch (e) {
      console.log(e);
    }
  }

  $doCheck() {
    this._$scope.models = _.slice(this.models, 0, this._MAX_MODEL);
  }

  //watch any change
  $onChanges(changes) {
    if (changes.models) {
      try {
        this._$scope.models = _.slice(this.models, 0, this._MAX_MODEL);
      } catch (e) {
        console.log(e);
      }
    }
  }

  //remove model from comparisonArray
  removeModelHandler(model) {
    if (!model) return;
    this.onDelete({ modelId: model.id });
  }

  submitCompare() {
    this.onSubmit();
  }
}
