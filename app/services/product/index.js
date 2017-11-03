import angular from "angular";
import { productHelper } from "utils/helper";

export default angular
  .module("app.services.productService", [])
  .service("productService", function(
    $http,
    constraintService,
    mockDataService,
    authService,
    networkService
  ) {
    "ngInject";
    return {
      getProductType: function() {
        let onSuccess = function(res) {
            return res && res.data;
          },
          onFail = function(e) {
            //code -1 is used when the api will return mock data
            return { code: -1, data: { ...mockDataService.productType } };
          };
        return $http
          .get(
            constraintService.baseUrl +
              constraintService.baseApi +
              "types?apikey=" +
              constraintService.apikey +
              "&accesstoken=" +
              constraintService.accesstoken,
            { cache: true }
          )
          .then(onSuccess, onFail);
      },

      getProductBrand: function(productTypeId) {
        if (!productTypeId)
          return new Promise((resolve, reject) => {
            reject(new Error("Must be provided product id"));
          });

        let onSuccess = function(res) {
            return res && res.data;
          },
          onFail = function(e) {
            //find brand match with typeId
            let brand = {};
            let mockData = [...mockDataService.productBrand];
            for (let i = 0; i < mockData.length; i++) {
              let item = mockData[i];
              if (item.type === productTypeId) {
                brand = item;
                break;
              }
            }
            //code -1 is used when the api will return mock data
            return { code: -1, data: brand };
          };
        return $http
          .get(
            constraintService.baseUrl +
              constraintService.baseApi +
              "brands?apikey=" +
              constraintService.apikey +
              "&accesstoken=" +
              constraintService.accesstoken +
              "&type=" +
              productTypeId,
            { cache: true }
          )
          .then(onSuccess, onFail);
      },

      getProduct: function(filter) {
        filter = !!filter ? filter : {};
        let brands, ids, roomsize;
        const id = Number.parseInt(filter.id),
          idsString = filter.ids && filter.ids.toString().split(","),
          type = Number.parseInt(filter.type),
          brandsString = filter.brands && filter.brands.toString().split(","),
          topscores = Number.parseInt(filter.topscores),
          frommsrp = Number.parseInt(filter.frommsrp),
          tomsrp = Number.parseInt(filter.tomsrp),
          roomsizeString =
            filter.roomsize && filter.roomsize.toString().split(","),
          search = filter.search && filter.search.toString();

        //convert brand to number in list
        brands =
          brandsString && brandsString.map(brand => Number.parseInt(brand));
        ids = idsString && idsString.map(id => Number.parseInt(id));
        roomsize =
          roomsizeString &&
          roomsizeString.map(item => item.toString().toLowerCase());
        let onSuccess = function(res) {
            let data = res && res.data;

            //update product data by helper
            if (data.data && data.data.products) {
              let products = [...data.data.products];
              data.data.products = products.map(product =>
                productHelper(product)
              );
            }
            return data;
          },
          onFail = function(e) {
            //find product match with filters
            let products = [];
            let mockData = [...mockDataService.productData];
            for (let i = 0; i < mockData.length; i++) {
              let product = mockData[i];
              if (id) {
                if (id === Number.parseInt(product.id)) {
                  products.push(product);
                  break;
                }
              } else {
                if (type && type !== Number.parseInt(product.type)) {
                  continue;
                }
                if (
                  brands &&
                  brands.indexOf(Number.parseInt(product.brand)) === -1
                ) {
                  continue;
                }
                if (search) {
                  let a = product.model && product.model.toLowerCase();
                  a = product.brandName && product.brandName.toLowerCase() + a;
                  let b = search && search.toLowerCase();
                  if (a.indexOf(b) === -1) continue;
                }
                if (
                  roomsize &&
                  product.roomSize &&
                  roomsize.indexOf(
                    product.roomSize.toString().toLowerCase()
                  ) === -1
                ) {
                  continue;
                }
                if (
                  frommsrp &&
                  product.msrp &&
                  Number.parseInt(product.msrp) < frommsrp
                ) {
                  continue;
                }
                if (
                  tomsrp &&
                  product.msrp &&
                  Number.parseInt(product.msrp) > tomsrp
                ) {
                  continue;
                }
                if (ids && ids.indexOf(Number.parseInt(product.id)) === -1) {
                  continue;
                }
                products.push(product);
              }
            }

            if (topscores) {
              let productSorted = _.sortBy(products, ["overallScore"]);
              products = _.slice(
                productSorted,
                Math.max(productSorted.length - topscores, 0),
                productSorted.length
              );
              _.reverse(products);
            }
            //code -1 is used when the api will return mock data
            return { code: -1, data: { products: products } };
          };
        let filterField = "";
        if (type) filterField += "&type=" + type;
        if (filter.brands) filterField += "&brands=" + filter.brands;
        if (topscores) filterField += "&topscores=" + topscores;
        if (frommsrp) filterField += "&frommsrp=" + frommsrp;
        if (tomsrp) filterField += "&tomsrp=" + tomsrp;
        if (roomsize) filterField += "&roomsize=" + roomsize;
        if (search) filterField += "&search=" + search;
        if (id) filterField = "&id=" + id;
        if (filter.ids) filterField = "&ids=" + filter.ids;
        let url =
          constraintService.baseUrl +
          constraintService.baseApi +
          "products?apikey=" +
          constraintService.apikey +
          "&accesstoken=" +
          constraintService.accesstoken +
          filterField;
        return $http.get(url, { cache: true }).then(onSuccess, onFail);
      },

      getFeatureProduct: function() {
        let onSuccess = function(res) {
            let data = res && res.data;
            //update product data by helper
            if (data.data && data.data.products) {
              let products = [...data.data.products];
              data.data.products = products.map(product =>
                productHelper(product)
              );
            }

            return data;
          },
          onFail = function(e) {
            //code -1 is used when the api will return mock data
            return { code: -1, data: { ...mockDataService.featureProduct } };
          };
        return $http
          .get(
            constraintService.baseUrl +
              constraintService.baseApi +
              "featured?apikey=" +
              constraintService.apikey +
              "&accesstoken=" +
              constraintService.accesstoken,
            { cache: true }
          )
          .then(onSuccess, onFail);
      },

      getTypeById: function(id) {
        return this.getProductType().then(res => {
          if (res.data && res.data.types) {
            let found = _.find(res.data.types, o => o.id === id);
            return found || null;
          }
        });
      }
    };
  });
