module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      {pattern: 'node_modules/jquery/dist/jquery.js', watched: false},
      {pattern: 'node_modules/angular/angular.js', watched: false},
      {pattern: 'node_modules/angular-mocks/angular-mocks.js', watched: false},
      'src/**/*.html',
      'src/**/!(*.spec).js',
      'src/**/*.spec.js'
    ],
    exclude: [],

    preprocessors: {
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.spec).js': ['coverage']
    },

    reporters: ['mocha', 'coverage'],

    mochaReporter: { // info at https://github.com/litixsoft/karma-mocha-reporter
      output: 'autowatch'
    },

    coverageReporter: {
      reporters: [
          // generates ./coverage/coverage-final.json
          {type: 'json', subdir: '.'}
      ]
    },

    htmlReporter: { // info at https://github.com/dtabuenc/karma-html-reporter
      outputDir: 'reports',
      namedFiles: true,
      pageTitle: 'Dojo App Specs',
      urlFriendlyName: true,
      reportName: 'spec-results',
      preserveDescribeNesting: true
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
}
