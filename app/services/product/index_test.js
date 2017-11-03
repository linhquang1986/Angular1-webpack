"use strict";

describe("Product service:", function() {
  var productService,
    constraintService,
    mockDataService,
    httpBackend,
    productTypeHandler,
    productBrandHandler,
    productHandler;
  beforeEach(module("app"));
  beforeEach(
    inject(function(
      _productService_,
      _constraintService_,
      _mockDataService_,
      $httpBackend
    ) {
      productService = _productService_;
      httpBackend = $httpBackend;
      constraintService = _constraintService_;
      mockDataService = _mockDataService_;

      // backend definition common for all tests
      productTypeHandler = $httpBackend
        .when(
          "GET",
          constraintService.baseUrl +
            constraintService.baseApi +
            "types?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken
        )
        .respond({
          code: 0,
          data: mockDataService.productType
        });

      productBrandHandler = $httpBackend
        .when(
          "GET",
          constraintService.baseUrl +
            constraintService.baseApi +
            "brands?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=1"
        )
        .respond({
          code: 0,
          data: mockDataService.productBrand[0]
        });

      productHandler = $httpBackend
        .when(
          "GET",
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken
        )
        .respond({
          code: 0,
          data: mockDataService.productData
        });
    })
  );

  it("should be defined", function() {
    expect(productService).toBeDefined();
  });

  describe("Get Type", function() {
    it("should fetch data from server production", function() {
      productService.getProductType().then(function(res) {
        expect(res.code).toBe(0);
        expect(res.data.types.length).toBeGreaterThan(0);
      });
      httpBackend.flush();
    });

    it("should use mock data if production down (404 status)", function() {
      productTypeHandler.respond(404, "");
      productService.getProductType().then(function(res) {
        expect(res.data.types.length).toBeGreaterThan(0);
      });
      httpBackend.flush();
    });

    it("should handle Invalid Api key", function() {
      productTypeHandler.respond(200, { code: 1, data: "Invalid API key" });
      productService.getProductType().then(function(res) {
        expect(res.code).toBe(1);
        expect(res.data).toContain("Invalid API key");
      });
      httpBackend.flush();
    });

    it("should handle Expired access token", function() {
      productTypeHandler.respond(200, {
        code: 2,
        data: "Expired access token"
      });
      productService.getProductType().then(function(res) {
        expect(res.code).toBe(2);
        expect(res.data).toContain("Expired access token");
      });
      httpBackend.flush();
    });
  });

  describe("Get Brand", function() {
    it("should fetch data from server production", function() {
      productService.getProductBrand(1).then(function(res) {
        expect(res.code).toBe(0);
        expect(res.data.type).toBe(1);
        expect(res.data.brands.length).toBeGreaterThan(-1);
      });
      httpBackend.flush();
    });

    it("should use mock data if production down (404 status)", function() {
      productBrandHandler.respond(404, "");
      productService.getProductBrand(1).then(function(res) {
        expect(res.code).toBe(-1);
        expect(res.data.type).toBe(1);
        expect(res.data.brands.length).toBeGreaterThan(0);
      });
      httpBackend.flush();
    });

    it("should handle Invalid Api key", function() {
      productBrandHandler.respond(200, { code: 1, data: "Invalid API key" });
      productService.getProductBrand(1).then(function(res) {
        expect(res.code).toBe(1);
        expect(res.data).toContain("Invalid API key");
      });
      httpBackend.flush();
    });

    it("should handle Expired access token", function() {
      productBrandHandler.respond(200, {
        code: 2,
        data: "Expired access token"
      });
      productService.getProductBrand(1).then(function(res) {
        expect(res.code).toBe(2);
        expect(res.data).toContain("Expired access token");
      });
      httpBackend.flush();
    });

    it("should return an error with empty product id", function() {
      //with empty product id, also return mock data
      expect(productService.getProductBrand().message).toContain(
        "Must be provided product id"
      );
    });
  });

  describe("Get Product", function() {
    it("should fetch all product from server production (without filter)", function() {
      productService.getProduct().then(function(res) {
        expect(res.code).toBe(0);
        expect(res.data.length).toBeGreaterThan(-1);
      });
      httpBackend.flush();
    });

    it("should use mock data if production down (404 status)", function() {
      productHandler.respond(404, "");
      productService.getProduct().then(function(res) {
        expect(res.code).toBe(-1); //code -1 is mock data is returned
        expect(res.data.products.length).toBeGreaterThan(0);
      });
      httpBackend.flush();
    });

    it("should handle Invalid Api key", function() {
      productHandler.respond(200, { code: 1, data: "Invalid API key" });
      productService.getProduct().then(function(res) {
        expect(res.code).toBe(1);
        expect(res.data).toContain("Invalid API key");
      });
      httpBackend.flush();
    });

    it("should handle Expired access token", function() {
      productHandler.respond(200, {
        code: 2,
        data: "Expired access token"
      });
      productService.getProduct().then(function(res) {
        expect(res.code).toBe(2);
        expect(res.data).toContain("Expired access token");
      });
      httpBackend.flush();
    });

    it("should works with type", function() {
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=1"
        )
        .respond(200, { data: true });
      productService.getProduct({ type: 1 }).then(function(res) {
        expect(res.data).toBe(true);
      });
      httpBackend.flush();
    });

    it("should works with brand", function() {
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&brand=1"
        )
        .respond(200, { data: true });
      productService.getProduct({ brand: 1 }).then(function(res) {
        expect(res.data).toBe(true);
      });
      httpBackend.flush();
    });

    it("should works with product id", function() {
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&id=1"
        )
        .respond(200, { data: true });
      productService.getProduct({ id: 1 }).then(function(res) {
        expect(res.data).toBe(true);
      });
      httpBackend.flush();
    });

    it("should works with combined brand and type", function() {
      // httpBackend.flush();
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=1&brand=2"
        )
        .respond(200, { data: true });
      productService.getProduct({ type: 1, brand: 2 }).then(function(res) {
        expect(res.data).toBe(true);
      });
      httpBackend.flush();
    });

    it("should works with combined topscores and type", function() {
      httpBackend
        .expectGET(
          constraintService.baseUrl +
            constraintService.baseApi +
            "products?apikey=" +
            constraintService.apikey +
            "&accesstoken=" +
            constraintService.accesstoken +
            "&type=1&topscores=5"
        )
        .respond(200, { data: true });
      productService.getProduct({ type: 1, topscores: 5 }).then(function(res) {
        expect(res.data).toBe(true);
      });
      httpBackend.flush();
    });
  });

  describe("Get Feature Product", function() {
    it("should return feature product data", function() {
      productService.getFeatureProduct(function(res) {
        expect(res.data.products.length).toBeGreaterThan(2);
        expect(res.data.productHighlight).toBeDefined();
      });
    });
  });
});
