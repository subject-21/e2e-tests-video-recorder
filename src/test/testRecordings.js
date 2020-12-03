const Recorder = require("../recorder/record");

const rec = new Recorder("recTest", "C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results");

(async () => {
    rec.start();

    setTimeout(() => {
        rec.stop();
    }, 5000);
})();