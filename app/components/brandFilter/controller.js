export default class {
  constructor($scope, $rootScope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._productService = productService;

    //bind methods to scope
    this._$scope.chooseBrand = this.chooseBrand.bind(this);
    //this._$scope.removeChooseBrand = this.removeChooseBrand.bind(this);

    //default data
    this._$scope.brands = [];
    //this._$scope.listBrandFilter = [];
    this._$scope.selectedBrand = null;

    this._$rootScope.$watchCollection(
      "comparisions.categories",
      (newValue, oldValue) => {
        //this._$scope.listBrandFilter = [];
        var catId =
          (this._$rootScope.comparisions &&
            this._$rootScope.comparisions.categories) ||
          [];
        if (catId.length > 0) {
          this.getProductBrand(catId[0]);
        } else {
          this._$scope.brands = [];
        }
      }
    );
  }

  chooseBrand(brand) {
    this._$scope.selectedBrand = brand;
    this._$rootScope.comparisions.brands[0] = brand.id;
    /*if (!_.includes(this._$scope.listBrandFilter, brand)) {
      this._$scope.listBrandFilter.push(brand);
      this._$rootScope.comparisions.brands.push(brand.id);
    }*/
  }
  /*removeChooseBrand(brand) {
    this._$scope.listBrandFilter = _.filter(
      this._$scope.listBrandFilter,
      item => {
        return item != brand;
      }
    );
    this._$rootScope.comparisions.brands = _.filter(
      this._$rootScope.comparisions.brands,
      item => {
        return item != brand.id;
      }
    );
  }*/
  // get ProductBrand
  getProductBrand(catId) {
    return this._productService.getProductBrand(catId).then(res => {
      //console.log('brands', res);
      if (res && res.data.brands) {
        this._$scope.brands = res.data.brands;
      }
      return this._$scope.brands;
    });
  }
}
