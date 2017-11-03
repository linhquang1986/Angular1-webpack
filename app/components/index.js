import backButton from "./backButton";
import categoryCarousel from "./categoryCarousel";
import comparatorContainer from "./comparatorContainer";
import compareModelSelector from "./compareModelSelector";
import comparisionTable from "./comparisionTable";
import comparisonFilter from "./comparisonFilter";
import comparisonModels from "./comparisonModels";
import footerBar from "./footerBar";
import headerBar from "./headerBar";
import measurementTabContent from "./measurementTabContent";
import menuHambuger from "./menuHambuger";
import productReviewTabMenu from "./productReviewTabMenu";
import reviewFeatureContainer from "./reviewFeatureContainer";
import reviewTeaserLandscape from "./reviewTeaserLandscape";
import reviewTeaserPortrait from "./reviewTeaserPortrait";
import scoringBarDetail from "./scoringBarDetail";
import scoringTabContent from "./scoringTabContent";
import searchBox from "./searchBox";
import sideBySideComparison from "./sideBySideComparison";
import specificationTabContent from "./specificationTabContent";
import teaserAbout from "./teaserAbout";
import topScoringContainer from "./topScoringContainer";
import homeHero from "./homeHero";
import comparisonTabMenu from "./comparisonTabMenu";
import comparisonSpecificationTabContent from "./comparisonSpecificationTabContent";
import comparisonMeasurementTabContent from "./comparisonMeasurementTabContent";
import comparisonAddModelTabContent from "./comparisonAddModelTabContent";
import comparisonScoringTabContent from "./comparisonScoringTabContent";
import customDropdown from "./customDropdown";
import exploreProduct from "./exploreProduct";
import brandModelSelector from "./brandModelSelector";
import specificationTable from "./specificationTable";

export default angular.module("app.components", [
  specificationTable.name,
  brandModelSelector.name,
  exploreProduct.name,
  customDropdown.name,
  comparisonScoringTabContent.name,
  comparisonSpecificationTabContent.name,
  comparisonMeasurementTabContent.name,
  comparisonAddModelTabContent.name,
  backButton.name,
  categoryCarousel.name,
  comparatorContainer.name,
  compareModelSelector.name,
  comparisionTable.name,
  comparisonFilter.name,
  comparisonModels.name,
  footerBar.name,
  headerBar.name,
  measurementTabContent.name,
  menuHambuger.name,
  productReviewTabMenu.name,
  reviewFeatureContainer.name,
  reviewTeaserLandscape.name,
  reviewTeaserPortrait.name,
  scoringBarDetail.name,
  scoringTabContent.name,
  searchBox.name,
  sideBySideComparison.name,
  specificationTabContent.name,
  teaserAbout.name,
  topScoringContainer.name,
  homeHero.name,
  comparisonTabMenu.name
]);
