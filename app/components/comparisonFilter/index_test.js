"use strict";
describe("Component: comparisionModels", function() {
  beforeEach(module("app"));

  describe("controller", function() {
    var controller;
    var scope, rootScope, httpBackend, constraintService, mockDataService;
    beforeEach(
      inject(function(
        $rootScope,
        $componentController,
        $httpBackend,
        _constraintService_,
        _mockDataService_
      ) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        constraintService = _constraintService_;
        mockDataService = _mockDataService_;

        controller = $componentController(
          "comparisionModels",
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
