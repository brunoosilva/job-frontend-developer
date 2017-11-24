const webpackConfig = require('./webpack.config');

module.exports = function karmaConfig (config) {
    config.set({
        frameworks: ['jasmine'],
        reporters:['spec', 'coverage-istanbul'],
        files: ['webpack.test.js'],
        preprocessors: {
            'webpack.test.js': ['webpack', 'sourcemap']
        },
        browsers: ['PhantomJS'],
        plugins: [
            'karma-coverage-istanbul-reporter',
            'karma-jasmine',
            'karma-webpack',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
            'karma-phantomjs-launcher'
        ],
        exclude: [
            // '*.js',
            'src/**/index.js',
            'src/**/*-config.js',
            'src/**/*-service.js'
        ],
        singleRun: true,
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            dir: 'coverage/',
            'report-config': {
                html: {
                    subdir: '.'
                }
            }
        },
        webpack: webpackConfig
    });
};
