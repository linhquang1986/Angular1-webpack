export default class {
  constructor($scope, $window) {
    "ngInject";
    this._$scope = $scope;
    this._$window = $window;

    //bind methods to scope
    this._$scope.openShare = this.openShare.bind(this);

    //default data
    this.shareTypes = ["FACEBOOK", "TWEET", "INSTAGRAM", "YOUTUBE"];
  }

  openShare(shareType) {
    if (this.shareTypes.indexOf(shareType) < 0)
      return new Error("This share type is not allow");
    var url,
      text = "I'm sharing THX";
    var currentLocation = this._$window.encodeURIComponent(
      this._$window.location.href
    );
    switch (shareType) {
      case "FACEBOOK":
        url =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          currentLocation +
          ";src=sdkpreparse";
        break;
      case "TWEET":
        url = "http://www.twitter.com/share?url=" + currentLocation;
        if (!!text) {
          url += "&text=" + text;
        }
        break;
    }
    var windowHeight = 485,
      windowWidth = 700;
    var x = this._$window.screen.width / 2 - windowWidth / 2;
    var y = this._$window.screen.height / 2 - windowHeight / 2;
    var link = this._$window.open(
      url,
      "sharegplus",
      "height=" +
        windowHeight +
        ",width=" +
        windowWidth +
        ",left=" +
        x +
        ",top=" +
        y
    );
  }
}
