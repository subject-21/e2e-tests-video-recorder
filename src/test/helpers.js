const AllureReporter = require("jasmine-allure-reporter");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
const jasmineEnv = jasmine.getEnv();
const reporter = new AllureReporter({
    resultsDir: "reporter-results"
});

jasmineEnv.addReporter(reporter);
