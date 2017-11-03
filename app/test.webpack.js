// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
import "angular";
import "angular-mocks/angular-mocks";
import "angular-route";
import "angular-ui-bootstrap";

const pages = require.context("./pages", true, /\.js$/);
// const components = require.context("./components", true, /\.js$/);
const services = require.context("./services", true, /\.js$/);

// services.keys().forEach(services);
pages.keys().forEach(pages);
// components.keys().forEach(components);
