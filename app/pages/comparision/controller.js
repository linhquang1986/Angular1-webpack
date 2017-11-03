import { mEmit, mOn } from "utils/emiter";
import { getGlobal } from "utils/global";
const EVENTS = getGlobal("EVENTS") || {};
const EVENT_NAME = "COMPARISON_MANAGEMENT_MODEL";

export default class {
  constructor($scope, $location, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;

    //default data
    this._$scope.sharedData = {
      productData: [],
      comparisonModels: [],
      productType: null
    };

    //get query params
    let params = $location.search() || {};
    this._$scope.listModelId = params.models && params.models.split(",");

    //remove duplicate data
    this._$scope.listModelId = _.uniqBy(this._$scope.listModelId);
    this._$scope.sharedData.productType = Number.parseInt(params.type);
    this._$scope.brandId = params.brand;
    this._$scope.typeName = null;

    //back to home if missing list of models and category id
    if (
      !this._$scope.listModelId ||
      (this._$scope.listModelId && this._$scope.listModelId.length === 0) ||
      !this._$scope.sharedData.productType
    ) {
      this._$location.path("/");
    }

    //if there is only 1 model to compare, redirect to product preview with this model
    if (this._$scope.listModelId && this._$scope.listModelId.length === 1) {
      this._$location
        .path("/productreview-page")
        .search({ productId: this._$scope.listModelId[0] });
    }

    if (this._$scope.listModelId && this._$scope.listModelId.length > 3) {
      console.warn(`Maximum product to compare must be 3`);
      this._$scope.listModelId = this._$scope.listModelId.slice(0, 3);
    }

    //get all scoring product data
    this.getScoringData(this._$scope.listModelId).then(res => {
      this._$scope.$apply(() => {
        this._$scope.typeName = res && res[0] && res[0].typeName;
        this._$scope.sharedData.productData = res;
      });
    });
  }

  async getScoringData(listModelId) {
    let ids = [].join.call(listModelId);
    return this._productService.getProduct({ ids }).then(res => {
      return (res && res.data && res.data.products) || [];
    });
  }
}
