const colors = require("./logColors");

const Logger = {
    err: (err) => {
        console.log(colors.red + err + colors.reset);
    },
    info: (msg) => {
        console.log(colors.magenta + msg + colors.reset);
    },
    sys: (msg) => {
        console.log(colors.cyan + colors.dim + msg + colors.reset);
    }
}

module.exports = Logger;