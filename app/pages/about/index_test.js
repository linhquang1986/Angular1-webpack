import page from "./index.js";

describe("Page: About Page", () => {
  describe("Controller", () => {
    let ctrl, scope, controller;
    beforeEach(() => {
      angular.mock.module("ngRoute");
      angular.mock.module(page.name);

      angular.mock.inject(($controller, $rootScope) => {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        scope = $rootScope.$new();
        ctrl = $controller("AboutPageCtrl", { $scope: scope });
        controller = $controller;
      });
    });

    describe("AboutPageCtrl", () => {
      it("should registered", () => {
        expect(ctrl).toBeDefined();
      });
    });
  });
});
