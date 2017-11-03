"use strict";
describe("Component: scoringBarDetail", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, mockDataService;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "scoringBarDetail",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
  });
});
