"use strict";
describe("Component: headerBar", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController("headerBar", { $scope: scope }, null);
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
    it("should be run testController func", function() {
      expect(scope.testController()).toEqual(true);
    });
  });

  describe("template", function() {
    var element, scope, $compile;
    //load needed templates from templates module
    beforeEach(module("templates"));

    beforeEach(
      inject(function(_$rootScope_, _$compile_, $templateCache) {
        var template = $templateCache.get("components/headerBar/template.html");
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element(template);
        element = $compile(element)(scope);
      })
    );

    it(
      "should be render logo",
      inject(function() {
        var logo = element.find("img");
        expect(logo && logo[0].src).toBeTruthy();
      })
    );

    it(
      "should be render hambuger menu",
      inject(function() {
        var el = element.find("menu-hambuger");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render search box",
      inject(function() {
        var el = element.find("search-box");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );
  });
});
