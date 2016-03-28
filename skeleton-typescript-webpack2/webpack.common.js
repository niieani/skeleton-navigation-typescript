var path = require('path');

module.exports = {
  entry: {
    main: [
      './src/main'
    ]
  },
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',
  resolve: {
    // An array of extensions that should be used to resolve modules.
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: ['', '.ts', '.js'],

    // Make sure root is src
    root: path.resolve('./src'),

    // remove other default values
    modulesDirectories: ['node_modules'],
    
    // use es2015 builds so that tree-shaking will work
    alias: {
      'aurelia-binding': 'aurelia-binding/dist/es2015/aurelia-binding.js',
      'aurelia-bootstrapper-webpack': 'aurelia-bootstrapper-webpack/dist/es2015/aurelia-bootstrapper-webpack.js',
      'aurelia-dependency-injection': 'aurelia-dependency-injection/dist/es2015/aurelia-dependency-injection.js',
      'aurelia-event-aggregator': 'aurelia-event-aggregator/dist/es2015/aurelia-event-aggregator.js',
      'aurelia-fetch-client': 'aurelia-fetch-client/dist/es2015/aurelia-fetch-client.js',
      'aurelia-framework': 'aurelia-framework/dist/es2015/aurelia-framework.js',
      'aurelia-history': 'aurelia-history/dist/es2015/aurelia-history.js',
      'aurelia-history-browser': 'aurelia-history-browser/dist/es2015/aurelia-history-browser.js',
      'aurelia-loader': 'aurelia-loader/dist/es2015/aurelia-loader.js',
      'aurelia-loader-webpack': 'aurelia-loader-webpack/dist/es2015/aurelia-loader-webpack.js',
      'aurelia-logging': 'aurelia-logging/dist/es2015/aurelia-logging.js',
      'aurelia-logging-console': 'aurelia-logging-console/dist/es2015/aurelia-logging-console.js',
      'aurelia-metadata': 'aurelia-metadata/dist/es2015/aurelia-metadata.js',
      'aurelia-pal': 'aurelia-pal/dist/es2015/aurelia-pal.js',
      'aurelia-pal-browser': 'aurelia-pal-browser/dist/es2015/aurelia-pal-browser.js',
      'aurelia-path': 'aurelia-path/dist/es2015/aurelia-path.js',
      'aurelia-polyfills': 'aurelia-polyfills/dist/es2015/aurelia-polyfills.js',
      'aurelia-route-recognizer': 'aurelia-route-recognizer/dist/es2015/aurelia-route-recognizer.js',
      'aurelia-router': 'aurelia-router/dist/es2015/aurelia-router.js',
      'aurelia-task-queue': 'aurelia-task-queue/dist/es2015/aurelia-task-queue.js',
      'aurelia-templating': 'aurelia-templating/dist/es2015/aurelia-templating.js',
      'aurelia-templating-binding': 'aurelia-templating-binding/dist/es2015/aurelia-templating-binding.js',      
      'aurelia-tools': 'aurelia-tools/dist/es2015/aurelia-tools.js',
      // this two need special treatment:
      'aurelia-templating-router': 'aurelia-templating-router/dist/es2015/aurelia-templating-router.js',
      'aurelia-templating-resources': 'aurelia-templating-resources/dist/es2015/aurelia-templating-resources.js',
    }
  },
  babelPlugins: [
    "transform-es2015-template-literals",
    "transform-es2015-literals",
    "transform-es2015-arrow-functions",
    "transform-es2015-block-scoped-functions",
    ["transform-es2015-classes", {
      "loose": true
    }],
    "transform-es2015-object-super",
    "transform-es2015-shorthand-properties",
    ["transform-es2015-computed-properties", {
      "loose": true
    }],
    ["transform-es2015-for-of", {
      "loose": true
    }],
    "transform-es2015-sticky-regex",
    "transform-es2015-unicode-regex",
    "transform-es2015-constants",
    ["transform-es2015-spread", {
      "loose": true
    }],
    "transform-es2015-parameters",
    ["transform-es2015-destructuring", {
      "loose": true
    }],
    "transform-es2015-block-scoping",
    ["transform-regenerator", {
      "async": false,
      "asyncGenerators": false
    }]
  ]
}
