"use strict";
describe("Component: compareModelSelector", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, rootScope, httpBackend, constraintService, mockDataService;
    beforeEach(
      inject(function(
        $rootScope,
        $componentController,
        $httpBackend,
        _constraintService_,
        _mockDataService_
      ) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        constraintService = _constraintService_;
        mockDataService = _mockDataService_;

        controller = $componentController(
          "compareModelSelector",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should get list of brands", function() {
      //list brand of given product type

      scope.product = { type: 1 }; //fake product data, only need type to test
      rootScope.$digest();

      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "brands?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=" +
            scope.product.type
        )
        .respond(200, {
          code: -1,
          data: _.find(mockDataService.productBrand, function(brands) {
            return (brands.type = scope.product.type);
          })
        });

      scope.$ctrl.getBrandData().then(function(res) {
        expect(res.type).toBe(scope.product.type);
        expect(res.brands.length).toBeGreaterThan(-1);
      });

      httpBackend.flush();
    });

    it("should not get list of brands without type product", function() {
      //fire err if has no product type
      var data = scope.$ctrl.getBrandData();
      expect(data.message).toContain("Must be provied product type");
    });

    it("should get list of models", function() {
      //list model of product type

      scope.product = { type: 1 }; //fake product data, only need type to test
      scope.selectedBrandId = 1;
      rootScope.$digest();

      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=" +
            scope.product.type +
            "&brand=" +
            scope.selectedBrandId
        )
        .respond(200, {
          code: -1,
          data: {
            products: [
              _.find(mockDataService.productData, function(product) {
                return (
                  product.type === scope.product.type &&
                  product.brand === scope.selectedBrandId
                );
              })
            ]
          }
        });

      scope.$ctrl.getModelData().then(function(res) {
        expect(res.length).toBeGreaterThan(-1);
      });

      httpBackend.flush();
    });

    it("should not get list of models without type product", function() {
      //fire err if has no product type
      var data = scope.$ctrl.getModelData();
      expect(data.message).toContain("Must be provied product type");
    });

    it("should select a brand", function() {
      //when user select a brand, will trigger a request to get list of models of this brand & product type, then save to the scope
      var brandId = 1;
      scope.$ctrl.selectBrandHandler(brandId);
      expect(scope.selectedBrandId).toBe(brandId);
    });

    it("should add a model", function() {
      //when user select a model and click on Add button, let add this product to array and save it in scope
      var model = mockDataService.productData[0];
      scope.$ctrl.addModelToComparisonHandler(model);
      var found = _.find(scope.comparisonArray, function(modelComparison) {
        return modelComparison.model.id === model.id;
      });
      expect(found.model).toEqual(model);
    });

    it("should toggle select a model", function() {
      //user can select or unselect a model to compare
      var model = mockDataService.productData[0];
      scope.comparisonArray = [{ model: model, selected: true }];
      rootScope.$digest();

      var found = _.find(scope.comparisonArray, function(modelComparison) {
        return modelComparison.model.id === model.id;
      });
      scope.$ctrl.toggleModel(model.id);
      expect(found.selected).toBe(false);
    });

    it("should remove a model away added model array", function() {
      //user can remove a model from added model array,this will change values in array
      var model = mockDataService.productData[0];
      scope.comparisonArray = [{ model: model, selected: true }];
      rootScope.$digest();

      var found = _.find(scope.comparisonArray, function(modelComparison) {
        return modelComparison.model.id === model.id;
      });
      scope.$ctrl.removeModelHandler(model.id);
      expect(scope.comparisonArray.length).toBe(0);
    });
  });
});
