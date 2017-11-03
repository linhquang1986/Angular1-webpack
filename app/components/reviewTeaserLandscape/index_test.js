"use strict";
describe("Component: reviewTeaserLandscape", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, location, route, rootScope;
    beforeEach(
      inject(function($rootScope, $componentController, $location, $route) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        location = $location;
        route = $route;
        controller = $componentController(
          "reviewTeaserLandscape",
          { $scope: scope, $attrs: {} },
          null
        );
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should route to product review page", function() {
      expect(route.current).toBeUndefined();
      scope.product.id = 1;
      rootScope.$digest();
      scope.$ctrl.openProductReview();
      rootScope.$digest();
      expect(route.current.templateUrl).toBe(
        "pages/productReview/template.html"
      );
      expect(route.current.controller).toBe("ProductReviewPageCtrl");
    });

    it("should not route to product review page without product id", function() {
      expect(route.current).toBeUndefined();
      scope.product.id = null;
      rootScope.$digest();
      var t = scope.$ctrl.openProductReview();
      expect(t.message).toContain("Must be provided product id to route");
    });
  });
});
