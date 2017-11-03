"use strict";
describe("Component: sideBySideComparison", function() {
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
          "sideBySideComparison",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should not get list of product with same type if missing product type", function() {
      scope.productType = null;
      rootScope.$digest();
      expect(scope.$ctrl.getListProductSameType().message).toContain(
        "Must be provided product type"
      );
    });

    it("should get list of product with same type", function() {
      scope.product = { type: 1, id: 1 };
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
            scope.product.type
        )
        .respond(200, {
          code: -1,
          data: {
            products: mockDataService.productData.filter(function(product) {
              return product.type === scope.product.type;
            })
          }
        });

      scope.$ctrl.getListProductSameType().then(function(products) {
        var found = _.find(products, function(product) {
          return product.id === scope.product.id;
        });
        expect(found).toBeFalsy();
        expect(products.length).toBeGreaterThan(-1);
      });
      httpBackend.flush();
    });

    it("should not make a comparation collection from list of product if missing products data", function() {
      var data = scope.$ctrl.getComparasionData();
      expect(data.message).toContain("Must be provided array of products");
    });

    it("should not make a comparation collection from list of product if products data is not array", function() {
      var data = scope.$ctrl.getComparasionData(1);
      expect(data.message).toContain("Must be provided array of products");
    });

    it("should make a comparation collection from list of product", function() {
      var data = scope.$ctrl.getComparasionData(mockDataService.productData);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toBeDefined();
      expect(data[0].score).toBeDefined();
      expect(data[0].image).toBeDefined();
    });
  });
});
