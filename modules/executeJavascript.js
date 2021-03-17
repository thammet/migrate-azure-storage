const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = {
    /**
     * Loads the javascript module from 'filename' and executes it
     * @param {BlobServiceClient} blobServiceClient 
     * @param {string} filepath 
     */
    executeJavascript: async (blobServiceClient, filepath) => {
        const mod = require(filepath);
        await mod.migrate(blobServiceClient)
    }
}