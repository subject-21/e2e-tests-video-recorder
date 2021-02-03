const { spawn } = require('child_process');
const path = require("path");
const fs = require("fs");
const log = require("../../logger/logger");
const errorHandle = require("../errors/errors");
/**
 *  @typedef {"mov"| "mp4"| "m4a"| "3gp"| "3g2"| "mj2"| "psp"| 
 *      "m4b"| "ism"| "ismv"| "isma"| "f4v" | "flv"} Format 
 * */
class Recorder {
    /**
     * @param {String} fullpath - Specify destination folder 
     * @param {Number} videoFps - Video framerate 
     * @param {Format} videoFormat - "flv" is recommended for Windows 7
     * */
    constructor(fullpath, videoFormat = "mp4", videoFps = 30) {
        if (!fs.existsSync(fullpath)) {
            fs.mkdirSync(fullpath);
        }
        const videoName = `test@${new Date().toLocaleString().replace(/[\s,\.\:/\/]/g, '_')}.${videoFormat}`;
        this.fullTargetPath = path.join(fullpath, videoName);
        this.videoFps = videoFps;
        this.ffmpeg = {};
    }

    start() {
        const command = ["-f", "gdigrab", "-framerate", `${this.videoFps}`, "-i", "desktop", `${this.fullTargetPath}`];
        this.ffmpeg = spawn("ffmpeg", command, { shell: true });
        log.info("video recorder started...");

        this.ffmpeg.stderr.on('data', (data) => {
            errorHandle(data);
        });

        this.ffmpeg.on('close', (code) => {
            if (code === 1) process.exit(code);
            log.sys(`video recorder finished with code ${code}`);
        });
    }

    stop() {
        setTimeout(() => {
            try {
                this.ffmpeg.stdin.write("q");
            } catch (error) {
                log.err("Error: video not saved: " + error);
                this.kill();
            }
        }, 1000);
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