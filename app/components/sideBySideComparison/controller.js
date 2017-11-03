export default class {
  constructor($scope, $attrs, $location, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;
    this._$location = $location;
    this._productService = productService;
    this._$scope.openProductReview = this.openProductReview.bind(this);
  }

  $onChanges(changes) {
    if (changes.product && changes.product.currentValue) {
      this._$scope.product = changes.product.currentValue;
      this.getListProductSameType();
    }
  }

  getListProductSameType() {
    if (this._$scope.product && this._$scope.product.type)
      this._$scope.productType = Number.parseInt(this._$scope.product.type);
    if (!this._$scope.productType)
      return new Error("Must be provided product type");
    return this._productService
      .getProduct({ type: this._$scope.productType })
      .then(res => {
        var products = res.data.products;

        //remove current product in list
        _.remove(products, product => {
          return product.id === this._$scope.product.id;
        });

        var comparationData = this.getComparasionData(products);
        this._$scope.comparationData = comparationData;
        return products;
      });
  }

  getComparasionData(products) {
    if (!products || (products && products.constructor.name !== "Array"))
      return new Error('"Must be provided array of products"');

    return (
      products &&
      products.map(product => {
        return {
          id: product.id,
          name: product.model,
          brandName: product.brandName,
          image: product.image,
          score: product.overallScore
        };
      })
    );
  }

  openProductReview(productId) {
    if (!productId)
      return new Error("Must be provided product id to route");
    this._$location
      .path("/productreview-page")
      .search({ productId: productId });
  }
}
