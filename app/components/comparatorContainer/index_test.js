"use strict";
describe("Component: comparatorContainer", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "comparatorContainer",
          { $scope: scope },
          null
        );
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
    it("should have a compare function to redirect to comaprasion page", function() {
      expect(angular.isFunction(scope.compare)).toBe(true);
    });
  });

  describe("template", function() {
    var element, scope, $compile;
    //load needed templates from templates module
    beforeEach(module("templates"));

    beforeEach(
      inject(function(_$rootScope_, _$compile_, $templateCache) {
        var template = $templateCache.get(
          "components/comparatorContainer/template.html"
        );
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element(template);
        element = $compile(element)(scope);
      })
    );

    it(
      "should be render category-carousel component",
      inject(function() {
        var el = element.find("category-carousel");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render brand-filter component",
      inject(function() {
        var el = element.find("brand-filter");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render model-filter component",
      inject(function() {
        var el = element.find("model-filter");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render compare button",
      inject(function() {
        var el = element.find("button");
        expect(el && el.text()).toEqual("Compare");
      })
    );
  });
});
