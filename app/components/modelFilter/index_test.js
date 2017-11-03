"use strict";
describe("Component: modelFilter", function() {
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
          "modelFilter",
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
    it("should have a chooseModel function", function() {
      expect(angular.isFunction(scope.chooseModel)).toBe(true);
    });
    it("should have a getModels function", function() {
      expect(angular.isFunction(scope.removeChooseModel)).toBe(true);
    });
    it("should have a removeChooseModel function", function() {
      expect(angular.isFunction(scope.$ctrl.getModels)).toBe(true);
    });
    /*it("should get array products", function() {
      productService.getProduct(1).then(function(res) {
        expect(angular.isArray(res.data.products)).toBe(true);
      });
      httpBackend.flush();
    });*/
  });

  //   describe("template", function() {
  //     var element, scope, $compile;
  //     //load needed templates from templates module
  //     beforeEach(module("templates"));

  //     beforeEach(
  //       inject(function(_$rootScope_, _$compile_, $templateCache) {
  //         var template = $templateCache.get(
  //           "components/menuHambuger/template.html"
  //         );
  //         scope = _$rootScope_.$new();
  //         $compile = _$compile_;
  //         element = angular.element(template);
  //         element = $compile(element)(scope);
  //       })
  //     );

  //     it(
  //       "should be render MENU text",
  //       inject(function() {
  //         var el = element.find("span");
  //         expect(el && el.text()).toEqual("MENU");
  //       })
  //     );
  //   });
});
