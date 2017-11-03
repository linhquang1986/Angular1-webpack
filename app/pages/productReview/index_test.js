"use strict";
describe("Page: Product Review Page", function() {
  describe("Controller", function() {
    beforeEach(module("app"));
    beforeEach(module("app.pages.productReview"));

    var controller, scope, httpBackend, constraintService;

    beforeEach(
      inject(function(
        _$controller_,
        $rootScope,
        $httpBackend,
        _constraintService_
      ) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        constraintService = _constraintService_;
        controller = _$controller_("ProductReviewPageCtrl", {
          $scope: scope
        });
      })
    );

    it("should get product data", function() {
      var productId = 1;
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&id=" +
            productId
        )
        .respond(200, { code: -1, data: { products: [{ data_test: true }] } });
      expect(scope.product).toEqual({});
      controller.getProductData(productId).then(function(res) {
        expect(scope.product).toEqual({ data_test: true });
        expect(res.data_test).toBe(true);
      });
      httpBackend.flush();
    });
  });
});
