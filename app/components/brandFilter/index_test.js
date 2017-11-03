"use strict";
describe("Component: brandFilter", function() {
  var productService,
    constraintService,
    mockDataService,
    httpBackend,
    productBrandHandler,
    productHandler,
    productTypeHandler;

  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController, $httpBackend, _productService_, _constraintService_, _mockDataService_) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        productService = _productService_;
        constraintService = _constraintService_;
        mockDataService = _mockDataService_;

        // backend definition common for all tests
        productTypeHandler = $httpBackend
          .when(
            "GET",
            constraintService.baseUrl +
            constraintService.baseApi +
            "types?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken
          )
          .respond({
            code: 0,
            data: mockDataService.productType
          });

        productBrandHandler = $httpBackend
          .when(
            "GET",
            constraintService.baseUrl +
            constraintService.baseApi +
            "brands?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=1"
          )
          .respond({
            code: 0,
            data: mockDataService.productBrand[0]
          });

        productHandler = $httpBackend
          .when(
            "GET",
            constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken
          )
          .respond({
            code: 0,
            data: mockDataService.productData
          });

        controller = $componentController(
          "brandFilter",
          {
            $scope: scope,
            productService: productService
          },
          null
        );
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
    it("should have a removeChooseBrand function", function() {
      expect(angular.isFunction(scope.removeChooseBrand)).toBe(true);
    });
    it("should have a chooseBrand function", function() {
      expect(angular.isFunction(scope.chooseBrand)).toBe(true);
    });
    it("should get array product brand", function() {
      productService.getProductBrand(1).then(function(res) {
        expect(angular.isArray(res.data.brands)).toBe(true);
      });
      httpBackend.flush();
    });
  });
});
