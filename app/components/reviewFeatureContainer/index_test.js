"use strict";
describe("Component: reviewFeatureContainer", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, rootScope;
    var httpBackend, route, location, constraintService;
    beforeEach(
      inject(function(
        $rootScope,
        $componentController,
        $httpBackend,
        _constraintService_
      ) {
        constraintService = _constraintService_;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $componentController(
          "reviewFeatureContainer",
          { $scope: scope },
          null
        );
        httpBackend = $httpBackend;
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should get list product feature", function() {
      scope.$ctrl.getListFeature().then(function(res) {
        expect(res.data.products.length).toBeGreaterThan(2);
        expect(res.data.productHighlight).toBeDefined();
      });
    });
  });
});
