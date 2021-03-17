const fs = require('fs');
const exec = require('child_process').execSync;

module.exports = {
    /**
     * Reads and executes a file containing an az cli script
     * @param {string} filepath 
     */
    executeAzCli: (filepath) => {
        var buffer = fs.readFileSync(filepath);
        var text = buffer.toString();
        exec(text)
    }
}