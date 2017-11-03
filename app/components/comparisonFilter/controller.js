import { mEmit, mOn } from "utils/emiter";
import { getGlobal } from "utils/global";
const EVENTS = getGlobal("EVENTS") || {};
const EVENT_NAME = "FILTER_COMPARISON_MANAGEMENT_MODEL";

export default class {
  constructor($scope, $location, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;

    //bind methods to scope
    this._$scope.removeModel = this.removeModel.bind(this);
    this._$scope.getListComparison = this.getListComparison.bind(this);
    this._$scope.toggleSelection = this.toggleSelection.bind(this);
    this._$scope.onModelSelect = this.onModelSelect.bind(this);
    this._$scope.compare = this.compare.bind(this);

    //default data
    this._$scope.listComparisonModel = [];
    this._$scope.allModel = [];
    this._$scope.categoryId = null;
    this._$scope.roomsize = ["Small", "Medium", "Large"];
    this._$scope.roomsizeSelected = ["Small", "Medium", "Large"];

    /*
    * slider setting
    * https://github.com/angular-slider/angularjs-slider
    * */
    this._$scope.slider = {
      minValue: 0,
      maxValue: 0,
      options: {
        floor: 0,
        ceil: 0,
        step: 10,
        noSwitching: true,
        hidePointerLabels: false,
        hideLimitLabels: true,
        translate: function(value) {
          return "$" + value;
        }
      }
    };

    $scope.$watch("allModel", value => {
      value && this.getListComparisonModel();
    });

    $scope.$watch("categoryId", value => {
      this.getCategory(value);

      value && (this.categoryId = value);
    });

    //watch categoryId from parent
    $scope.$watch(
      () => {
        return this.categoryId;
      },
      value => {
        if (!value) return;
        this._$scope.categoryId = value;
      }
    );
  }

  $doCheck() {
    this._$scope.allModel = this.models || [];
  }

  setupPriceSlider(_minMSRP, _maxMSRP) {
    // set range slider
    const minMSRP = _minMSRP ? _minMSRP : 0;
    const maxMSRP = _maxMSRP ? _maxMSRP : 0;
    this._$scope.slider.minValue = minMSRP;
    this._$scope.slider.maxValue = maxMSRP;
    this._$scope.slider.options.floor = minMSRP;
    this._$scope.slider.options.ceil = maxMSRP;
  }

  updateData() {
    this.models = this._$scope.allModel;
  }

  //get added model
  getListComparisonModel() {
    let inListComparison = _.filter(
      this._$scope.allModel,
      model => !!model.inListComparison
    );
    this._$scope.listComparisonModel = inListComparison;
    return inListComparison;
  }

  // get category data
  getCategory(categoryId) {
    return this._productService.getProductType().then(res => {
      let productTypes =
        res.data.types &&
        _.find(res.data.types, function(o) {
          return Number.parseInt(o.id) == Number.parseInt(categoryId);
        });
      let category = productTypes;

      if (category) {
        //setup slider

        this.setupPriceSlider(category.minMSRP, category.maxMSRP);
        //update list of products
        this.getListComparison();
      } else {
        let data = res.data;
        this.setupPriceSlider(data.minMSRP, data.maxMSRP);
      }
    });
  }

  compare() {
    let listModel =
      this._$scope.listComparisonModel &&
      this._$scope.listComparisonModel.map(item => item.model.id);
    let filter = {
      type: this._$scope.categoryId,
      models: listModel.join()
    };
    this._$location.path("/comparison-page").search(filter);
  }

  removeModel(modelId) {
    if (!modelId) return;
    let found = _.find(
      this._$scope.allModel,
      item => item.model.id === modelId
    );
    found && (found.inListComparison = false);
    this.getListComparisonModel();
  }

  onModelSelect(model) {
    if (
      this._$scope.listComparisonModel &&
      this._$scope.listComparisonModel.length >= this._MAX_MODEL
    ) {
      //TOAST HERE
      return;
    }

    let found = _.find(
      this._$scope.allModel,
      item => item.model.id === model.id
    );
    found && (found.inListComparison = true);
    this.getListComparisonModel();
  }

  // Toggle selection for room size
  toggleSelection(size) {
    let idx = this._$scope.roomsizeSelected.indexOf(size);
    if (idx > -1) {
      this._$scope.roomsizeSelected.splice(idx, 1);
    } else {
      this._$scope.roomsizeSelected.push(size);
    }
  }

  //update list comparision
  getListComparison() {
    let filter = {};
    filter.type = this._$scope.categoryId;
    filter.frommsrp = this._$scope.slider.minValue;
    filter.tomsrp = this._$scope.slider.maxValue;
    filter.roomsize = this._$scope.roomsizeSelected.join(",");

    return this._productService.getProduct(filter).then(res => {
      var arrModels = res.data.products;
      let rs = arrModels.map(function(model) {
        var modelObj = {
          inListComparison: false,
          model: model
        };
        return modelObj;
      });

      //dont remove products which same category
      let listProducts = this._$scope.allModel.map(item => {
        if (item.inListComparison && item.model.type === filter.type) {
          return item.model.id;
        }
      });
      rs.forEach(o => {
        if (listProducts.indexOf(o.model.id) !== -1) {
          o.inListComparison = true;
        }
      });

      this._$scope.allModel = rs;
      this.updateData();
      return res.data && res.data.products;
    });
  }
}
