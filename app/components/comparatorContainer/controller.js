import { mEmit, mOn } from "utils/emiter";
import { getGlobal } from "utils/global";
const EVENTS = getGlobal("EVENTS") || {};
const EVENT_NAME = "COMPARISON_FILTER";

export default class {
  constructor($scope, $rootScope, $location, $attrs, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;

    //bind methods to scope
    this._$scope.compare = this.compare.bind(this);
    this._$scope.removeModel = this.removeModel.bind(this);
    this._$scope.onModelSelect = this.onModelSelect.bind(this);

    //default data
    this._$scope.selectedCategory = null;
    this._$scope.selectedModelList = [];
    this._MAX_MODEL = 3;
    this._$scope.optionDropdown = {
      titleClass: "white-color",
      itemClass: "white-color",
      iconDownClass: "lnk-yellow"
    };

    //anytime category change, renew its brand
    $scope.$watch("selectedCategory", categoryId => {
      this.resetData();
    });
  }

  resetData() {
    this._$scope.selectedModelList = [];
  }

  onModelSelect(model) {
    if (
      this._$scope.selectedModelList &&
      this._$scope.selectedModelList.length >= this._MAX_MODEL
    ) {
      //TOAST HERE
      return;
    }

    this._$scope.selectedModelList &&
      this._$scope.selectedModelList.push(model);
    this._$scope.selectedModelList = _.uniqBy(
      this._$scope.selectedModelList,
      item => item.id
    );
  }

  // remove model
  removeModel(modelId) {
    _.remove(this._$scope.selectedModelList, model => model.id === modelId);
  }

  compare() {
    let listModel =
      this._$scope.selectedModelList &&
      this._$scope.selectedModelList.map(model => model.id);
    let filter = {
      type: this._$scope.selectedCategory,
      models: listModel.join()
    };
    this._$location.path("/comparison-page").search(filter);
  }
}
