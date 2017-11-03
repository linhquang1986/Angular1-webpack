export default class {
  constructor($scope, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$attrs = $attrs;

    //bind methods to scope
    this._$scope.changeTab = this.changeTab.bind(this);
    this._$scope.toggleCompareModel = this.toggleCompareModel.bind(this);

    //default data
    this._$scope.scoringData = [];
    this._$scope.measurementData = [];
    this._$scope.productType = null;
    this.tabIDs = ["SCORES", "SPECIFICATIONS", "MEASUREMENTS", "COMPARE"];
    this._$scope.config = {
      openCompareModel: false,
      selectedTabId: this.tabIDs[0]
    };
    this._$scope.sharedData = {};

    $scope.$watchCollection(
      () => this.sharedData,
      value => {
        this._$scope.sharedData = value;
        this._$scope.products = this._$scope.sharedData.productData;
        this._$scope.productType = this._$scope.sharedData.productType;
        this._$scope.comparisonModels = this._$scope.sharedData.comparisonModels;
        this.buildScoringData(this._$scope.products).then(rs => {
          this._$scope.$apply(() => {
            this._$scope.scoringData = rs;
          });
        });
        this.buildMeasurementData(this._$scope.products).then(rs => {
          this._$scope.$apply(() => {
            this._$scope.measurementData = rs;
          });
        });
      }
    );
  }

  buildMeasurementData(models) {
    return new Promise(resolve => {
      let rs = {};
      models.forEach(model => {
        let measurements = model.measurements || [];
        measurements.forEach(measurement => {
          rs[measurement.category] = rs[measurement.category] || {};
          rs[measurement.category].desc = measurement.desc;
          rs[measurement.category].items = rs[measurement.category].items || [];
          measurement.items &&
            measurement.items.forEach(item => {
              let newItem = { ...item, _fullName_: model._fullName_ };
              item.compare && rs[measurement.category].items.push(newItem);
            });
        });
      });
      return resolve(rs);
    });
  }

  buildScoringData(models) {
    return new Promise(resolve => {
      let rs = models.map(model => ({
        id: model.id,
        image: model.image,
        title: model.scoreTitle,
        brandName: model.brandName,
        overallScore: model.overallScore,
        productName: model.model,
        product_scores: (model.scores && model.scores.scores) || []
      }));
      return resolve(rs);
    });
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
