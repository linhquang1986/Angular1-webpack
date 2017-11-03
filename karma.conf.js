// jshint strict: false

const path = require("path");

module.exports = function(config) {
  config.set({
    // basePath: "./app",

    preprocessors: {
      "**/*.html": ["ng-html2js"],
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      "app/test.webpack.js": ["webpack", "sourcemap"]
    },

    // singleRun: true,

    ngHtml2JsPreprocessor: {
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: "templates"
    },

    files: [
      // Grab all files in the app folder that contain .spec.
      "app/test.webpack.js"
    ],

    autoWatch: true,

    // Reference: https://github.com/karma-runner/karma-jasmine
    // Set framework to jasmine
    frameworks: ["jasmine"],

    // browsers: ['Chrome'],

    plugins: [
      // 'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      "karma-jasmine",
      "karma-junit-reporter",
      "karma-ng-html2js-preprocessor",
      "karma-webpack",
      "karma-coverage",
      "karma-sourcemap-loader"
    ],
    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      "progress",

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      "coverage"
    ],

    // Configure code coverage reporter
    coverageReporter: {
      dir: "coverage/",
      reporters: [{ type: "text-summary" }, { type: "html" }]
    },

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    },
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },

    webpack: require("./webpack.test"),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: "errors-only"
    }
  });
};
