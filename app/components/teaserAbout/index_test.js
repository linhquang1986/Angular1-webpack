"use strict";
describe("Component: teaserAbout", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController(
          "teaserAbout",
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

  //   describe("template", function() {
  //     var element, scope, $compile;
  //     //load needed templates from templates module
  //     beforeEach(module("templates"));

  //     beforeEach(
  //       inject(function(_$rootScope_, _$compile_, $templateCache) {
  //         var template = $templateCache.get("components/teaserAbout/template.html");
  //         scope = _$rootScope_.$new();
  //         $compile = _$compile_;
  //         element = angular.element(template);
  //         element = $compile(element)(scope);
  //       })
  //     );

  //     it(
  //       "should be render SEARCH text",
  //       inject(function() {
  //         debugger;
  //         var el = element.find("span");
  //         expect(el && el.text()).toEqual("|SEARCH");
  //       })
  //     );
  //   });
});
