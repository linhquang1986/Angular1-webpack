export default class {
  constructor($scope, $attrs, productService, $location) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;
    this._$location = $location;
    this._productService = productService;

    //default data
    this._$scope.category = {};
    this._$scope.products = [];

    //bind methods to scope
    this._$scope.viewProduct = this.viewProduct.bind(this);
  }

  $onChanges(changes) {
    if (changes.category && changes.category.currentValue) {
      this._$scope.category = changes.category.currentValue;
      this._$scope.category &&
        this.getTopProductScoring(this._$scope.category.id);
    }
  }

  viewProduct(productId) {
    this._$location.path("/productreview-page").search({ productId });
  }

  //get top product scoring
  getTopProductScoring(categoryId) {
    var filter = { type: categoryId, topscores: 3 };
    return this._productService.getProduct(filter).then(res => {
      let products = res && res.data && res.data.products;
      products = _.sortBy(products, product => product.overallScore);
      this._$scope.products = _.reverse(products);
    });
  }
}
