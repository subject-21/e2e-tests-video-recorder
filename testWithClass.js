const Recorder = require("./src/recorder/record");

(async () => {
   const videoRecorder = new Recorder("test3", "C:\\Users\\Owner\\Desktop\\testFF");
   videoRecorder.start();
   setTimeout(() => {
    videoRecorder.stop();
}, 10000);
})(); 