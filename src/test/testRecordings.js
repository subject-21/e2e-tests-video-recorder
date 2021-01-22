const Recorder = require("../recorder/record");
const rec = new Recorder(require("path").join(__dirname, "results"));

rec.start();

setTimeout(() => {
    rec.stop();
}, 6000);