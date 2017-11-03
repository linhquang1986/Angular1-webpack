export default class {
  constructor($scope, $location) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;

    //default data
    this._$scope.allModel = [];
    this._$scope.sortData = {};

    //bind methods to scope
    this._$scope.add = this.add.bind(this);
    this._$scope.remove = this.remove.bind(this);
    this._$scope.sort = this.sort.bind(this);
    this._$scope.viewProduct = this.viewProduct.bind(this);

    $scope.$watch("allModel", (newValue, oldValue) => {
      //re-sort if list of models changes
      if (newValue.length !== oldValue.length) {
        this.sort("name", { type: "inc" });
      }
    });

    $scope.$watch(
      () => this.models,
      value => {
        this._$scope.allModel = this.models;
      }
    );
  }

  updateData() {
    this.models = [...this._$scope.allModel];
  }

  viewProduct(productId) {
    this._$location.path("/productreview-page").search({ productId });
  }

  add(model) {
    if (!model) return;
    let found = _.find(
      this._$scope.allModel,
      item => item.model.id === model.id
    );

    const maxProduct = 3;

    //get number of added product in list, maximum of three products
    let products = this._$scope.allModel.filter(
      product => product.inListComparison
    );

    if (products.length < maxProduct) {
      found && (found.inListComparison = true);
    } else {
      //TODO should be notify to user, like toast a message
    }

    this.updateData();
  }

  remove(model) {
    if (!model) return;
    let found = _.find(
      this._$scope.allModel,
      item => item.model.id === model.id
    );
    found && (found.inListComparison = false);
    this.updateData();
  }

  sort(type, opt = {}) {
    if (type === "price" || type === "score" || type === "name") {
      //remove other sort
      let currentSort = opt.type || this._$scope.sortData[type];
      this._$scope.sortData = {};
      this._$scope.sortData[type] = currentSort;

      let data = [...this._$scope.allModel];
      data = _.sortBy(data, item => {
        if (type === "price") return Number.parseInt(item.model.msrp);
        if (type === "score") return Number.parseInt(item.model.overallScore);
        if (type === "name") return item.model._fullName_;
      });

      if (this._$scope.sortData[type] === "dec") {
        this._$scope.sortData[type] = "inc";
        _.reverse(data);
      } else {
        this._$scope.sortData[type] = "dec";
      }

      //update data after sorted
      this._$scope.allModel = data;
      this.updateData();
    } else return;
  }
}
