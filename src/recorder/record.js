const { spawn } = require('child_process');
const path = require("path");
const verifyData = require("./verifyData");
// **** TODO: Add option to create desination folder itsself if not exists **** \\
class Recorder {
    /** @param {String} videoName @param {String} targetFolderPath - destination folder @param {Number} videoFps - video framerate @param {String} videoFormat - "mp4" | "mkv" */
    constructor(videoName, targetFolderPath, videoFps = 30, videoFormat = "mkv") {
        const validName = verifyData(videoName, targetFolderPath);
        const finalName = validName? validName : videoName;
        
        this.fullTargetPath = path.join(targetFolderPath, finalName) + `.${videoFormat}`;
        this.videoFps = videoFps;
        this.ffmpeg = {};
    }
    
    start() {
        const command = ["-f", "gdigrab", "-framerate", `${this.videoFps}`, "-i", "desktop", `${this.fullTargetPath}`];
        this.ffmpeg = spawn("ffmpeg", command, { shell: true });
        console.log("Video Recorder started...");
        this.ffmpeg.on('error', (err) => {
            console.log(`Recorder got some errors: ${err}`);
        });
    }

    stop() {
        setTimeout(() => {
            this.ffmpeg.stdin.write("q");
        }, 500);
    }
}

module.exports = Recorder;