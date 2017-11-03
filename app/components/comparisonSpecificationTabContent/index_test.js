"use strict";
describe("Component: scoringTabContent", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, mockDataService, rootScope;
    beforeEach(
      inject(function($rootScope, $componentController, _mockDataService_) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        mockDataService = _mockDataService_;
        controller = $componentController(
          "scoringTabContent",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should get scoring bar data from product data", function() {
      scope.product = mockDataService.productData[0];
      rootScope.$digest();
      var data = scope.$ctrl.getScoringData();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].type).toBeDefined();
      expect(data[0].data.length).toBeGreaterThan(0);
    });
  });
});
