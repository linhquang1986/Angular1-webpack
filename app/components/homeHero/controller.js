export default class {
  constructor($scope, homepageService, $sce) {
    "ngInject";
    this._$scope = $scope;
    this._$sce = $sce;

    //default data
    this._$scope.homeBackgroundStyle = { "background-image": "" };
    this._$scope.items = [];

    homepageService.getHomePageData().then(res => {
      let data = res && res.data;
      if (data) {
        this._$scope.homeBackgroundStyle[
          "background-image"
        ] = `url("${data.image}")`;

        this._$scope.items = this.buildItems(data.items);
      }
    });
  }
  buildItems(items) {
    return items.map(item => {
      if (item.area === "Product") {
        item.link = "productreview-page?productId=" + item.pid;
      }
      return this._$sce.trustAsHtml(`
        <script>
          function moveTo(page){
            location.href='/#!/'+page
          }
        </script>
        <div class="col-md-3 col-sm-6 tout-block" onclick="moveTo('${item.link}')">
          <div class="panel-container" style="${item.styleBg
            ? item.styleBg
            : ""}">
            <div class="helper"></div>
            <img class="panel-image" src="${item.image &&
              item.image.toString()}" alt="" style="${item.styleImage
        ? item.styleImage
        : ""}">
            <div class="panel-text" style="${item.styleText
              ? item.styleText
              : ""}">
              <div class="table-cell-style">
                ${!!item.text1
                  ? "<div>" + item.text1.toString() + "</div>"
                  : "<div>&nbsp;</div>"}
                          ${!!item.text2
                            ? "<div class='h1'>" +
                              item.text2.toString() +
                              "</div>"
                            : ""}
                          ${!!item.text3
                            ? "<div>" + item.text3.toString() + "</div>"
                            : "<div>&nbsp;</div>"}
              </div>
            </div>
          </div>
        </div>`);
    });
  }
  /*
  <script>
        function scrollToTopscore(){
            $('html, body').animate({
              scrollTop: $('.topscoring-section').offset().top
            }, 2000);
        }

        function moveTo(page){
          location.href='/#!/'+page
        }
      </script>
      <div onclick="${item.link === "explore-products-page"
          ? "scrollToTopscore()"
          : "moveTo('" + item.link + "')"}">
          <div class="banner-bg fill" style="${item.styleBg ? item.styleBg : ''}" >
            <div class="bg fill bg-fill bg-loaded">
              <img src="${item.image &&
                item.image.toString()}" alt="" style="${item.styleImage
        ? item.styleImage
        : ""}">
            </div>
            <div class="overlay"></div>
          </div>
          <div class="banner-container" style="${item.styleText
            ? item.styleText
            : ""}">
            ${!!item.text1
              ? "<div>" + item.text1.toString() + "</div>"
              : "<div>&nbsp;</div>"}
            ${!!item.text2
              ? "<div class='h1'>" + item.text2.toString() + "</div>"
              : ""}
            ${!!item.text3
              ? "<div>" + item.text3.toString() + "</div>"
              : "<div>&nbsp;</div>"}
          </div>
        </div>*/
}
