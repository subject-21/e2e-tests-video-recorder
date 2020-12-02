const glob = require("glob");
const path = require("path");

const verifyData = (videoName, targetFolderPath) => {
    const fullPath = path.join(targetFolderPath, videoName) + ".*";
    if(glob.sync(fullPath + ".*").length > 0) {
        const newName = `testVideo${new Date().toLocaleString().replace(/[\s,\.\:]/g, '_')}`;  
        console.error(`${videoName} allready exists. video name will be ${newName} instead`);
        return (newName);
    }
}

module.exports = verifyData;