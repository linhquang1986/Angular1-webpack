"use strict";
describe("Page: Landing Page", function() {
  describe("Controller", function() {
    beforeEach(module("app.pages.landing"));

    var $controller, $scope;

    beforeEach(
      inject(function(_$controller_, $rootScope) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $scope = $rootScope.$new();
        $controller = _$controller_;
      })
    );

    /*describe("$scope.testController", function() {
      it("should be return true", function() {
        var controller = $controller("LandingPageCtrl", { $scope: $scope });
        expect($scope.testController()).toEqual(true);
      });
    });*/
  });

  describe("template", function() {
    var element, scope, $compile;
    //load needed templates from templates module
    beforeEach(module("templates"));

    beforeEach(
      inject(function(_$rootScope_, _$compile_, $templateCache) {
        var template = $templateCache.get("pages/landing/template.html");
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element(template);
        element = $compile(element)(scope);
        // scope.test = "Test";
        // scope.$apply();
      })
    );

    it(
      "should be render header-bar component",
      inject(function() {
        var el = element.find("header-bar");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render comparator-container component",
      inject(function() {
        var el = element.find("comparator-container");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render teaser-about component",
      inject(function() {
        var el = element.find("teaser-about");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    it(
      "should be render review-feature-container component",
      inject(function() {
        var el = element.find("review-feature-container");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );

    // it(
    //   "should be render top-scoring-container component",
    //   inject(function() {
    //     var el = element.find("top-scoring-container");
    //     expect(el && el.length).toBeGreaterThan(3);
    //   })
    // );

    it(
      "should be render footer-bar component",
      inject(function() {
        var el = element.find("footer-bar");
        expect(el && el.length).toBeGreaterThan(0);
      })
    );
  });
});
