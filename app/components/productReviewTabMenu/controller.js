export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //bind methods to scope
    this._$scope.changeTab = this.changeTab.bind(this);
    this._$scope.toggleCompareModel = this.toggleCompareModel.bind(this);

    //default data
    this.tabIDs = ["SCORES", "SPECIFICATIONS", "MEASUREMENTS", "COMPARE"];
    this._$scope.config = {
      openCompareModel: false,
      selectedTabId: this.tabIDs[0]
    };
    this._$scope.product = {};
  }

  $onChanges(changes) {
    if (changes.product) {
      this._$scope.product = changes.product.currentValue;
    }
  }

  toggleCompareModel(force) {
    if (typeof force === "boolean") {
      this._$scope.config.openCompareModel = force;
      return;
    }
    this._$scope.config.openCompareModel = !this._$scope.config
      .openCompareModel;
    this._$scope.changeTab("COMPARE");
  }

  changeTab(tabID) {
    if (tabID != "COMPARE") {
      this._$scope.config.openCompareModel = false;
    }
    //validate tab id given
    if (this.tabIDs.indexOf(tabID) < 0) return;
    this._$scope.config.selectedTabId = tabID;
  }
}
