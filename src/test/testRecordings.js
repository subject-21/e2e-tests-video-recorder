const Recorder = require("../recorder/record");
const rec = new Recorder("C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results", "mp4");

rec.start();

setTimeout(() => {
    rec.stop();
}, 6000);
