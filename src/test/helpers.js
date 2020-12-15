jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
const Recorder = require("../recorder/record");
const destPath = "C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results/";
let testName = "testVideo";

const rec = new Recorder(testName, destPath);
jasmine.getEnv().beforeAll(() => {
    rec.start();
});
jasmine.getEnv().afterAll(() => {
    rec.stop();
});