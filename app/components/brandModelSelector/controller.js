export default class {
  constructor($scope, $window, productService) {
    "ngInject";
    this._$scope = $scope;
    this._productService = productService;

    //bind methods to scope
    this._$scope._onBrandSelect = this._onBrandSelect.bind(this);
    this._$scope._onModelSelect = this._onModelSelect.bind(this);

    //default data
    this._$scope.selectedCategory = null;
    this._$scope.brandData = [];
    this._$scope.modelData = [];

    //custom class for custom-dropdown
    this._$scope.dropdownOptions = {};
  }

  $onChanges(changes) {
    if (changes.optionDropdown) {
      this._$scope.dropdownOptions = changes.optionDropdown.currentValue;
    }

    if (changes.categoryId && changes.categoryId.currentValue) {
      this._$scope.selectedCategory = Number.parseInt(
        changes.categoryId.currentValue
      );

      this.resetData();

      //re update its brands
      this.getBrand(this._$scope.selectedCategory);
    }
  }

  $onInit() {
    this._$scope.inline = this.inline;
  }

  resetData() {
    this._$scope.brandData = [];
    this._$scope.modelData = [];
  }

  getBrand(categoryId) {
    if (!categoryId) return;
    this._$scope.brandData = [];
    this._productService.getProductBrand(categoryId).then(res => {
      if (res && res.data.brands) {
        let brands = res.data.brands || [];
        this._$scope.brandData = brands.map(brand => ({
          name: brand.name,
          value: brand
        }));
        this._$scope.brandData.unshift({
          name: "Any brand",
          value: {}
        });
      }
    });
  }

  getProduct(brandId) {
    var filter = {
      type: this._$scope.selectedCategory
    };

    brandId && (filter.brands = brandId);

    if (!filter.type) return (this._$scope.models = []);
    this._$scope.modelData = [];
    this._productService.getProduct(filter).then(res => {
      if (res && res.data && res.data.products) {
        let products = res.data.products || [];
        this._$scope.modelData = products.map(product => ({
          name: product._fullName_,
          value: product
        }));
      }
    });
  }

  _onBrandSelect(item) {
    //get its products
    this.getProduct(item && item.id);

    //callback func
    if (typeof this.onBrandSelect === "function") {
      this.onBrandSelect({ item });
    }
  }

  _onModelSelect(item) {
    //callback func
    if (typeof this.onModelSelect === "function") {
      this.onModelSelect({ item });
    }
  }
}
