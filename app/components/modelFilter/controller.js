import { mEmit, mOn } from "utils/emiter";
import { getGlobal } from "utils/global";
const EVENTS = getGlobal("EVENTS") || {};
const EVENT_NAME = "COMPARISON_FILTER";
export default class {
  constructor($scope, $rootScope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._productService = productService;

    //bind methods to scope
    this._$scope.chooseModel = this.chooseModel.bind(this);
    this._$scope.removeChooseModel = this.removeChooseModel.bind(this);

    //default data
    this._$scope.models = [];
    this._$scope.listModelsFilter = [];
    this._$scope.selectedModel = null;
    //watch when change categories
    this._$rootScope.$watchCollection(
      "comparisions.categories",
      (newValue, oldValue) => {
      this._$scope.selectedModel = null;
        this._$rootScope.comparisions &&
          this.getModels(this._$rootScope.comparisions);
      }
    );

    //watch when change brand
    this._$rootScope.$watchCollection(
      "comparisions.brands",
      (newValue, oldValue) => {
        this._$rootScope.comparisions &&
          this.getModels(this._$rootScope.comparisions);
      }
    );
  }

  //get model filter
  chooseModel(model) {
    if (!model) return;
    this._$scope.selectedModel = model;
    mEmit(EVENTS.LANDING_PAGE, {
      EVENT_NAME,
      task: "choose_model",
      payload: model
    });

    /*if (!_.includes(this._$scope.listModelsFilter, model)) {
      this._$scope.listModelsFilter.push(model);
      this._$rootScope.comparisions.models.push(model.id);
    }*/
  }

  // remove model
  removeChooseModel(model) {
    this._$scope.listModelsFilter = _.filter(
      this._$scope.listModelsFilter,
      function(obj) {
        return obj != model;
      }
    );
    this._$rootScope.comparisions.models = _.filter(
      this._$rootScope.comparisions.models,
      item => {
        return item != model.id;
      }
    );
  }

  // get ProductBrand
  getModels(comparisions) {
    var filter = {
      type: comparisions.categories.join(),
      brands: comparisions.brands.join()
    };

    if (!filter.type) return (this._$scope.models = []);

    return this._productService.getProduct(filter).then(res => {
      if (res && res.data && res.data.products) {
        this._$scope.models = res.data.products;
      }
      return this._$scope.models;
    });
  }
}
