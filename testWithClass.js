const Recorder = require("./src/recorder/record");

(async () => {
    const videoRecorder = new Recorder("test", "C:/Users/Neili/OneDrive/Documents/projects/e2e-tests-video-recorder/results");
    videoRecorder.start();
   setTimeout(() => {
    videoRecorder.stop();
}, 10000);
})(); 