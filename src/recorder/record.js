const { spawn } = require('child_process');
const path = require("path");
const fs = require("fs");
/**
 *  @typedef {"mov"| "mp4"| "m4a"| "3gp"| "3g2"| "mj2"| "psp"| 
 *      "m4b"| "ism"| "ismv"| "isma"| "f4v" | "flv"} Format 
 * */
class Recorder {
    /**
     * @param {import('fs').PathLike} targetFolderPath - destination folder 
     * @param {Number} videoFps - video framerate 
     * @param {Format} videoFormat - Windows 7 : "flv", Windows 10 : "mp4"
     * */
    constructor(targetFolderPath, videoFormat, videoFps = 30) {
        if (!fs.existsSync(targetFolderPath)) {
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
        console.log("\x1b[35m", "Video Recorder started...", "\x1b[0m");
        this.ffmpeg.on('error', (err) => {
            console.log(`Recorder got some errors: ${err}`);
        });

    }

    stop() {
        setTimeout(() => {
            try {
                this.ffmpeg.stdin.write("q");
                console.log("\x1b[35m", "Video Recorder finished", "\x1b[0m");
            } catch (error) {
                this.kill();
            }
        }, 500);
    }

    isRecording() {
        return (!this.ffmpeg.killed);
    }

    kill() {
        if (this.isRecording()) {
            this.ffmpeg.kill('SIGINT');
        }
    }

}

module.exports = Recorder;