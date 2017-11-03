"use strict";
describe("Component: menuHambuger", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "menuHambuger",
          { $scope: scope },
          null
        );
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
        var template = $templateCache.get(
          "components/menuHambuger/template.html"
        );
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element(template);
        element = $compile(element)(scope);
      })
    );

    it(
      "should be render MENU text",
      inject(function() {
        var el = element.hasClass("btn-top-menu");
        expect(el).toEqual(true);
      })
    )
  });
});
