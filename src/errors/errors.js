const { Errors } = require("./Errors.json");
const log = require("../../logger/logger");
const errorHandle = (err) => {
    const exception = Buffer.from(err).toString();
    Errors.forEach((error) => {
        if (error.errMsg == exception) {
            log.err(error.errName);
        }
    });
}

module.exports = errorHandle