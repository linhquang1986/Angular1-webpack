import angular from "angular";

export default angular
  .module("app.services.homepageService", [])
  .service("homepageService", function(
    $http,
    constraintService,
    mockDataService,
    networkService
  ) {
    "ngInject";
    return {
      getHomePageData: function() {
        let onSuccess = function(res) {
            return res.data;
          },
          onFail = function(e) {
            //code -1 is used when the api will return mock data
            return { code: -1, data: { ...mockDataService.homeData } };
          };
        return $http
          .get(
            constraintService.baseUrl +
              constraintService.baseApi +
              "home?apikey=" +
              constraintService.apikey +
              "&accesstoken=" +
              constraintService.accesstoken,
            { cache: true }
          )
          .then(onSuccess, onFail);
      }
    };
  });
