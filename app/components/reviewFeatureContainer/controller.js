export default class {
  constructor($scope, $location, productService, $attrs) {
    "ngInject";
    this._$scope = $scope;
    this._$location = $location;
    this._productService = productService;
    this._$attrs = $attrs;

    //default data
    this._$scope.featureProduct = [];
    this._$scope.productHighlight = {};
    this._$scope.categories = [];

    this.getListFeature();
  }

  $onChanges(changes) {
    if (changes.categories) {
      this._$scope.categories = changes.categories.currentValue;
    }
  }

  //get list of feature product
  getListFeature() {
    //we need an api which return feature product list, now we just simulate fake api (promise)
    //we expect the api will return a list of product id, and one productHighlight id
    return this._productService.getFeatureProduct().then(res => {
      if (res && (res.code === 0 || res.code === -1)) {
        if (!res.data.products) return;

        let products = [...res.data.products];
        /* this._$scope.productHighlight = this.getProductHighlight(products);
        this._$scope.featureProduct = products;
        console.log(products)
        console.log(this._$scope.categories);*/
        //need to transpile typeId = >type name
        this.preProcess(products, newProducts => {
          this._$scope.productHighlight = this.getProductHighlight(products);
          this._$scope.featureProduct = products;
        });
      }
    });
  }

  preProcess(products, cb) {
    //clone this object
    let rs = [...products];
    rs.forEach(product => {
      /*this._productService.getTypeById(product.type).then(type => {
        product.typeName = type ? type.name : "";
      });*/

      product.category = _.filter(this._$scope.categories, function(cat) {
        return cat.featuredProductID === product.id;
      });
    });
    cb(rs);
  }

  getProductHighlight(products) {
    if (!_.isArray(products)) {
      return;
    }
    //get first product and remove it from products array
    let hl = products[0];
    products.shift();
    return hl;
  }
}
