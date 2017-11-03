"use strict";
describe("Component: productReviewTabMenu", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "productReviewTabMenu",
          { $scope: scope, $attrs: { $observe: function() {} } },
          null
        );
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });

    describe("toggleCompareModel function", function() {
      it("should be change config", function() {
        scope.config.openCompareModel = false;
        scope.toggleCompareModel();
        expect(scope.config.openCompareModel).toBe(true);
      });

      it("should be force change config", function() {
        scope.config.openCompareModel = false;
        scope.toggleCompareModel(false);
        expect(scope.config.openCompareModel).toBe(false);
      });
    });

    describe("changeTab function", function() {
      it("should be has value 'SCORES'", function() {
        expect(scope.config.selectedTabId).toBe("SCORES");
      });

      it("should changed config with 'MEASUREMENTS' id", function() {
        scope.changeTab("MEASUREMENTS");
        expect(scope.config.selectedTabId).toBe("MEASUREMENTS");
      });

      it("should not changed config with wrong id", function() {
        scope.changeTab("WRONG");
        expect(scope.config.selectedTabId).not.toBe("WRONG");
      });

      it("should not changed config with null id", function() {
        scope.changeTab(null);
        expect(scope.config.selectedTabId).not.toBe(null);
      });
    });
  });
});
