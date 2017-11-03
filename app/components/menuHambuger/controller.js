export default class {
  constructor($scope, $rootScope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._productService = productService;
    //bind methods to scope
    this._$scope.toggleMenu = this.toggleMenu.bind(this);

    //default data
    this._$rootScope.isOpenMenu = false;
    this._$rootScope.closeMenu = true;
    //default data
    this._$scope.categories = [];
    this.getAllCategories();
  }

  toggleMenu() {
    this._$rootScope.isOpenSearch = false;
    if (this._$rootScope.isOpenMenu == false) {
      this._$rootScope.isOpenMenu = true;
    } else {
      this._$rootScope.isOpenMenu = false;
    }
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
