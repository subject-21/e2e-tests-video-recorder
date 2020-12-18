const AllureReporter = require("jasmine-allure-reporter");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
const Recorder = require("../recorder/record");
const destPath = "C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results/";
const jasmineEnv = jasmine.getEnv();
let testName = "testVideo";
const rec = new Recorder(testName, destPath);

const reporter = new AllureReporter({
    resultsDir: "reporter-results"
});

jasmineEnv.addReporter(reporter);
const reporterUtils = reporter.allure;
const reporterOptions = global.allure;



jasmineEnv.beforeAll(() => {
    rec.start();
});
jasmineEnv.afterAll(() => {
    const status = jasmineEnv.currentSpec.failedExpectations;
    status ? rec.stop() : rec.delete();
});

if(rec.isRecording()) {
    rec.forceKill();
}