"use strict";
describe("Component: backButton", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "backButton",
          { $scope: scope },
          null
        );
        // console.log(controller, scope);
      })
    );
    it("should be attached to the scope", function() {
      expect(scope.$ctrl).toBe(controller);
    });
  });

  //   describe("template", function() {
  //     var element, scope, $compile;
  //     //load needed templates from templates module
  //     beforeEach(module("templates"));

  //     beforeEach(
  //       inject(function(_$rootScope_, _$compile_, $templateCache) {
  //         var template = $templateCache.get("components/headerBar/template.html");
  //         scope = _$rootScope_.$new();
  //         $compile = _$compile_;
  //         element = angular.element(template);
  //         element = $compile(element)(scope);
  //       })
  //     );

  //     it(
  //       "should be render logo",
  //       inject(function() {
  //         var logo = element.find("img");
  //         expect(logo && logo[0].src).toBeTruthy();
  //       })
  //     );
  //   });
});
