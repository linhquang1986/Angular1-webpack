"use strict";
describe("Component: specificationTabContent", function() {
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
          "specificationTabContent",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
      })
    );

    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    it("should get specification data from product data", function() {
      scope.product = mockDataService.productData[0];
      rootScope.$digest();
      var data = scope.$ctrl.getSpecificationsData();
      expect(angular.isObject(data)).toBe(true);
    });
  });
});
