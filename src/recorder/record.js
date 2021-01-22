const { spawn } = require('child_process');
const path = require("path");
const fs = require("fs");
class Recorder {
    /** @param {String} targetFolderPath - destination folder @param {Number} videoFps - video framerate @param {"mov"| "mp4"| "m4a"| "3gp"| "3g2"| "mj2"| "psp"| "m4b"| "ism"| "ismv"| "isma"| "f4v"} videoFormat */
    constructor(targetFolderPath, videoFps = 30, videoFormat = "mov") {
        if (!fs.existsSync(targetFolderPath)){
            fs.mkdirSync(targetFolderPath);
        }
        const videoName = `test@${new Date().toLocaleString().replace(/[\s,\.\:/\/]/g, '_')}.${videoFormat}`;
        this.fullTargetPath = path.join(targetFolderPath, videoName);
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

    delete() {
        //console.log(buff);
    }

    isRecording() {
        return (!this.ffmpeg.killed);
    }

    kill() {
        if (this.isRecording()) {
            this.ffmpeg.kill('SIGINT');
        }
    }

    forceKill() {
        //
    }
}

module.exports = Recorder;