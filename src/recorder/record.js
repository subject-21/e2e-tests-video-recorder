const { spawn } = require('child_process');
const path = require("path");
const verifyData = require("./verifyData");
// **** TODO: Add option to create desination folder itsself if not exists **** \\
class Recorder {
    /** @param {String} videoName @param {String} targetFolderPath - destination folder @param {Number} videoFps - video framerate @param {String} videoFormat - "mp4" | "mkv" */
    constructor(videoName, targetFolderPath, videoFps = 30, videoFormat = "mkv") {
        const validName = verifyData(videoName, targetFolderPath);
        let finalName = "";
        if(validName) {finalName = validName} else {finalName = videoName}

        this.fullTargetPath = path.join(targetFolderPath, finalName) + `.${videoFormat}`;
        this.videoFps = videoFps;
        this.ffmpeg = {};
    }
    
    start() {
        const command = ["-f", "gdigrab", "-framerate", `${this.videoFps}`, "-i", "desktop", `${this.fullTargetPath}`];
        this.ffmpeg = spawn("ffmpeg", command);
        console.log("Video Recorder started...");
        this.ffmpeg.on('close', (code) => {
            console.log(`Recording ended with code ${code}`);
            console.log(`The video of the test created in: ${path.dirname(this.fullTargetPath)}\nWith the name: ${path.basename(this.fullTargetPath)}`);
        });
        this.ffmpeg.on('error', (err) => {
            console.log(`err ${err}`);
        });
        this.ffmpeg.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });
          this.ffmpeg.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
          });
    }

    stop() {
        this.ffmpeg.stdin.write("q");
    }
}

module.exports = Recorder;