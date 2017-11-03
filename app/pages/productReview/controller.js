export default class {
  constructor($scope, $location, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;
    const _this = this;
    //default data
    $scope.product = {};
    $scope.productId = null;
    this._$scope.categories = [];
    //   get productId from params
    this._$scope.productId = this._$location.search().productId || null;
    this._$scope.productId = Number.parseInt(this._$scope.productId);

    if (!this._$scope.productId) {
      this._$location.path("/");
    }
    // get product type
    this.getAllCategories().then(function() {
      // get product data
      _this.getProductData(_this._$scope.productId);
    });
  }

  getProductData(productId) {
    return this._productService.getProduct({ id: productId }).then(res => {
      this._$scope.product =
        res.data && res.data.products && res.data.products[0];
      let productType = this._$scope.product.type;
      this._$scope.product.category = _.filter(
        this._$scope.categories,
        function(cat) {
          return cat.id === productType;
        }
      )[0];
      return this._$scope.product;
    });
  }

  // get product type
  getAllCategories() {
    return this._productService.getProductType().then(res => {
      if (res && res.data) {
        this._$scope.categories = res.data.types;
        return this._$scope.categories;
      }
    });
  }
}
