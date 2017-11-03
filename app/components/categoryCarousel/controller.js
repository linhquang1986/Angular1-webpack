import { mEmit, mOn } from "utils/emiter";
import { getGlobal } from "utils/global";
const EVENTS = getGlobal("EVENTS") || {};
const EVENT_NAME = "COMPARISON_FILTER";
export default class {
  constructor($scope, $rootScope, productService) {
    "ngInject";
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._productService = productService;

    //bind methods to scope
    this._$scope.hightlight = this.hightlight.bind(this);
    this._$scope.chooseCategory = this.chooseCategory.bind(this);
    this._$scope.jumpToPrev = this.jumpToPrev.bind(this);
    this._$scope.jumpToNext = this.jumpToNext.bind(this);

    //default data
    this._$scope.categories = [];
    this._$scope.currentCategory = {};
    this._$scope.selectedCategory = {};

    this.getAllCategories().then(cats => {
      //watch categoryId from parent
      $scope.$watch(
        () => {
          return this.categoryId;
        },
        value => {
          if (!value) return;
          this._$scope.currentCategory = this._$scope.selectedCategory = this.getCategoryById(
            value
          );
        }
      );
    });
  }

  // hightlight category
  hightlight(category, isHighlight) {
    this._$scope.currentCategory = isHighlight
      ? category
      : this._$scope.selectedCategory;
  }

  //get category by id
  getCategoryById(id) {
    let found = _.find(this._$scope.categories, cat => cat.id === id);
    return found || {};
  }

  // choose category
  chooseCategory(category) {
    if (!category) return;
    this.categoryId = category.id;
    this._$scope.selectedCategory = this._$scope.currentCategory = category;
  }

  // Prev carousel
  jumpToPrev() {
    var currentIndex = this._$scope.categories.findIndex(
      i => i.id === this._$scope.currentCategory.id
    );
    if (currentIndex > 0) {
      var category = this._$scope.categories[currentIndex - 1];
      this.chooseCategory(category);
    }
  }
  // Next carousel
  jumpToNext() {
    var currentIndex = this._$scope.categories.findIndex(
      i => i.id === this._$scope.currentCategory.id
    );
    if (currentIndex < this._$scope.categories.length - 1) {
      var category = this._$scope.categories[currentIndex + 1];
      this.chooseCategory(category);
    }
  }

  preProcess(categories) {
    if (!_.isArray(categories)) return;
    return (
      categories &&
      categories.map(cat => {
        cat._image_ = this.color === "black" ? cat.image1 : cat.image2;
        return cat;
      })
    );
  }

  // get product type
  getAllCategories() {
    return this._productService.getProductType().then(res => {
      if (res && res.data) {
        let categories = [...res.data.types];
        this._$scope.categories = this.preProcess(categories);
        //this._$scope.currentCategory = this._$scope.categories[0];
        return this._$scope.categories;
      }
      return [];
    });
  }
}
