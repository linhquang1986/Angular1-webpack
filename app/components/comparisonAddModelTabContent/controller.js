export default class {
  constructor($scope, $attrs, productService, $location) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;
    this._$location = $location;
    this._productService = productService;

    //bind methods to scope
    this._$scope.selectModel = this.selectModel.bind(this);
    this._$scope.onDeleteModel = this.onDeleteModel.bind(this);
    this._$scope.onSubmitCompare = this.onSubmitCompare.bind(this);
    this._$scope.addModelToComparison = this.addModelToComparisonHandler.bind(
      this
    );

    //default data
    this._$scope.productType = null;
    this._$scope.selectedModel = {};
    this._$scope.comparisonModels = [];
    this._$scope.optionDropdown = {
      titleClass: "dropdown-gray gray-light",
      itemClass: "white-color",
      iconDownClass: "lnk-yellow"
    };
  }

  $onChanges(changes) {
    if (changes.productType && changes.productType.currentValue) {
      this._$scope.productType = Number.parseInt(
        changes.productType.currentValue
      );
    }

    if (changes.productList && changes.productList.currentValue) {
      //manualy add to comparison list
      this._$scope.productList = changes.productList.currentValue;
      this._$scope.productList.forEach(product => {
        this.selectModel(product);
        this.addModelToComparisonHandler();
      });
    }
  }

  //callback to delete selected model
  onDeleteModel(modelId) {
    _.remove(
      this._$scope.comparisonModels,
      model => model.model.id === modelId
    );
  }

  //callback to submit compare selected model
  onSubmitCompare() {
    let models =
      this._$scope.comparisonModels &&
      this._$scope.comparisonModels.map(model => model.model.id);
    this._$location.path("/comparison-page").search({
      type: this._$scope.productType,
      models: models.join()
    });
  }

  //when select brand from dropdown, save its id to scope
  selectModel(model) {
    if (!model) return;
    this._$scope.selectedModel = model;
  }

  //when user add new model to array, by default it will be selected to compare
  addModelToComparisonHandler() {
    if (!this._$scope.selectedModel) return;
    this._$scope.comparisonModels.push({
      model: this._$scope.selectedModel
    });

    this._$scope.comparisonModels = _.unionBy(
      this._$scope.comparisonModels,
      i => i.model && i.model.id
    );
  }
}
