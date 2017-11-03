"use strict";
describe("Component: searchBox", function() {
  beforeEach(module("app"));
  // beforeEach(module("searchService"));

  describe("controller", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController("searchBox", { $scope: scope }, null);
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
        var template = $templateCache.get("components/searchBox/template.html");
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element(template);
        element = $compile(element)(scope);
      })
    );

    it(
      "should be render SEARCH button",
      inject(function() {
        var el = element.find("button.btn-search-top");
        expect(el).toBeDefined();
      })
    );
  });

  describe("search function", function() {
    var controller;
    var scope;
    beforeEach(
      inject(function($rootScope, $componentController) {
        scope = $rootScope.$new();
        controller = $componentController("searchBox", { $scope: scope }, null);
        // console.log(controller, scope);
      })
    );
    it("should expose searchText to the view", function() {
      expect(scope.searchText).toBeDefined();
    });
    it("should expose a method search", function() {
      expect(scope.searchAll).toBeDefined();
      expect(angular.isFunction(scope.searchAll)).toBe(true);
    });
    it("should expose searchText", function() {
      scope.searchText = "";
      expect(scope.searchAll()).toBe(false);
    });
  });

  // describe('Asynchronous calls', function() {
  //   it('should call asyncCall on searchService', function() {
  //     expect(searchService.searchAll).toHaveBeenCalled();
  //     expect(searchService.searchAll.calls.count()).toBe(1);
  //   });

  //   it('should do something on success', function() {
  //     var data = ['something', 'on', 'success'];
  //     deferred.resolve(data);
  //     scope.$digest();
  //     expect(scope.searchData).toBe(data);
  //   });

  //   it('should do something on error', function() {
  //     deferred.reject(400);
  //     scope.$digest();
  //     expect(scope.hasError).toBe(true);
  //   });

  // });
});
