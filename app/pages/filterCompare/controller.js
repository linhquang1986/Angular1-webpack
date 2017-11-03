export default class {
  constructor($scope, $location, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;

    //default data
    this._$scope.listComparisonModel = [];
    this._$scope.categoryId = null;
    this._$scope.allModel = [];

    //bind methods to scope
    this._$scope.onSubmitCompare = this.onSubmitCompare.bind(this);

    //   get productId from params
    this._$scope.categoryId = this._$location.search().productTypeId || null;
    this._$scope.categoryId =
      this._$scope.categoryId && Number.parseInt(this._$scope.categoryId);
    // if (!this._$scope.categoryId) return;

    //get initial data
    this.getProduct(this._$scope.categoryId);
    $scope.$watch("allModel", value => {
      //if category id is undefined, then set default value is type of first product which selected
      !this._$scope.categoryId && this.setDefaultCategory(value);
    });
  }

  setDefaultCategory(models) {
    let found = _.find(models, model => model.inListComparison);
    found && (this._$scope.categoryId = found.model && found.model.type);
  }

  //get products of given type product
  getProduct(typeId) {
    let filter = {};
    typeId && (filter.type = typeId);

    return this._productService.getProduct({ ...filter }).then(res => {
      let products = res.data && res.data.products;
      if (!products) return;
      return (this._$scope.allModel = products.map(product => ({
        inListComparison: false,
        model: (product => {
          let rs = {};
          Object.keys(product).forEach(key => (rs[key] = product[key]));
          return rs;
        })(product)
      })));
    });
  }

  //sort all model
  sortAllModel(data) {
    let models = this._$scope.allModel;
    if (data.type === "price") {
      this._$scope.allModel = _.sortBy(models, [
        model => Number.parseInt(model.model.msrp)
      ]);
      if (data.isDec) _.reverse(this._$scope.allModel);
    }
    if (data.type === "score") {
      this._$scope.allModel = _.sortBy(models, [
        model => Number.parseInt(model.model.overallScore)
      ]);
      if (data.isDec) _.reverse(this._$scope.allModel);
    }
  }

  onSubmitCompare() {
    let models =
      this._$scope.listComparisonModel &&
      this._$scope.listComparisonModel.map(model => model.model.id);
    this._$location.path("/comparison-page").search({
      type: this._$scope.categoryId,
      models: models.join()
    });
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
}
