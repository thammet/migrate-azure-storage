
const { loadBlobServiceClientAndHistoryBlob } = require("../modules/blob");
const { load, loadHistory, save, scriptsDirectory } = require("../modules/history");
const { executeAzCli } = require('../modules/executeAzCli');
const { executeJavascript } = require('../modules/executeJavascript');
const path = require("path");

module.exports = async () => {
    const scripts = load();
    if(scripts.length == 0) {
        console.log("No scripts to execute")
        return;
    }

    const [blobServiceClient, historyBlob] = await loadBlobServiceClientAndHistoryBlob();

    let history = await loadHistory(historyBlob);
    const newScripts = scripts.filter(script => !history.includes(script));

    if(newScripts.length == 0) {
        console.log("No scripts to execute")
        return;
    }

    for(const filename of newScripts) {
        console.log("Executing", filename)

        const filepath = path.join(process.cwd(), scriptsDirectory, filename);

        if(filename.endsWith('.azcli')) {
            executeAzCli(filepath);
        }
        else {
            await executeJavascript(blobServiceClient, filepath);
        }

        history = [...history, filename];
        await save(historyBlob, history)
    }
}