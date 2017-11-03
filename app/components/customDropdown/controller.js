export default class {
  constructor($scope, $rootScope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._productService = productService;

    //bind methods to scope
    this._$scope._onSelect = this._onSelect.bind(this);

    //default data
    this._$scope.items = [];
    this._$scope.selectedItem = {};
  }

  $onInit() {
    this._$scope.items = this.items;
    this._$scope.placeholder = this.placeholder;
    this._$scope.options = this.options || {};
  }

  $onChanges(changes) {
    if (changes.items) {
      this._$scope.selectedItem = {};
      this._$scope.items = this.items;
    }
    if (changes.itemDefault) {
      this._$scope.selectedItem = changes.itemDefault.currentValue;
      this._onSelect(changes.itemDefault.currentValue);
    }
  }

  _onSelect(item) {
    if (!item) return;
    this._$scope.selectedItem = item;
    this.onSelect({ item: item.value });
  }
}
