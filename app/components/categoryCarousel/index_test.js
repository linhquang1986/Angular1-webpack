"use strict";
describe("Component: categoryCarousel", function() {
  var productService,
    constraintService,
    mockDataService,
    httpBackend,
    productTypeHandler,
    productTypes;
  beforeEach(module("app"));
  describe("controller", function() {
    var controller;
    var scope;
    var deferred;
    beforeEach(
      inject(function($q, $rootScope, $componentController, _productService_, $httpBackend, _constraintService_, _mockDataService_) {
        deferred = $q.defer();
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

        controller = $componentController(
          "categoryCarousel",
          {
            $scope: scope,
            productService: productService,
            deferred: deferred
          },
          null
        );
      })
    );

    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
    it("should have a jumpToCategory function", function() {
      expect(angular.isFunction(scope.jumpToCategory)).toBe(true);
    });
    it("should have a chooseCategory function", function() {
      expect(angular.isFunction(scope.chooseCategory)).toBe(true);
    });
    it("should have a removeChooseCategory function", function() {
      expect(angular.isFunction(scope.chooseCategory)).toBe(true);
    });
    it("should have a jumpToPrev function", function() {
      expect(angular.isFunction(scope.chooseCategory)).toBe(true);
    });
    it("should have a jumpToNext function", function() {
      expect(angular.isFunction(scope.chooseCategory)).toBe(true);
    });
    it("should get array product type", function() {
      scope.$ctrl.getAllCategories().then(function(res) {
        productTypes = res;
        expect(angular.isArray(res)).toBe(true);
      });
      httpBackend.flush();
    });

  });

});