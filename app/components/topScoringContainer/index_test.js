"use strict";
describe("Component: topScoringContainer", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var httpBackend, scope, mockDataService, rootScope;
    beforeEach(
      inject(function($rootScope, $componentController, _mockDataService_, $httpBackend) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        mockDataService = _mockDataService_;
        controller = $componentController(
          "topScoringContainer",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
        httpBackend = $httpBackend;
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
  });
});
