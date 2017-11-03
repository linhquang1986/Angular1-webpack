export default class {
  constructor($scope, $timeout, $rootScope, productService, $location, $window) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._$location = $location;
    this._$window = $window;
    this._$timeout = $timeout;
    this._productService = productService;

    //bind methods to scope
    this._$scope.toggleOpenSearch = this.toggleOpenSearch.bind(this);
    this._$scope.searchAll = this.searchAll.bind(this);
    this._$scope.searchProduct = this.searchProduct.bind(this);
    this._$scope.ngModelOptionsSelected = this.ngModelOptionsSelected.bind(
      this
    );

    //default data
    this._$rootScope.isOpenSearch = false;
    this._$scope.searchText = "";
    this._$scope.results = [];
  }

  // toggle open search menu
  toggleOpenSearch() {
    this._$rootScope.isOpenMenu = false;
    if (this._$rootScope.isOpenSearch == false) {
      this._$rootScope.isOpenSearch = true;
    } else {
      this._$rootScope.isOpenSearch = false;
    }
    // set focus for input
    let inputSearch = this._$window.document.getElementById('inputSearch');
    this._$timeout(function() {
      inputSearch.focus();
    },1000);
  }
  setFocus() {
    let input = $window.document.getElementById('inputSearch');
    debugger
    input.focus();
  };
  // search function
  searchAll() {
    if (this._$scope.searchText == "") {
      return false;
    }
  }

  //search product
  searchProduct(search) {
    return this._productService.getProduct({ search }).then(res => {
      return (this._$scope.results = (res.data && res.data.products) || []);
    });
  }

  //handler selected
  ngModelOptionsSelected(event, item) {
    if (!item) return;
    //route to review page
    this._$location
      .path("/productreview-page")
      .search({ productId: Number.parseInt(item.id) });
  }
}
