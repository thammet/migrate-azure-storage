const fs = require('fs');
const { scriptsDirectory } = require("../modules/history");

module.exports = (filename, shouldBeJavascript) => {
    if(filename == null) {
        throw new Error("Filename cannot be null")
    }

    const filepath = `${scriptsDirectory}/${filename}.${shouldBeJavascript ? 'js' : 'azcli'}`;

    let sampleFile;

    if(shouldBeJavascript) {
        sampleFile = `
const {BlobServiceClient} = require('@azure/storage-blob')

module.exports = {
    /**
     * 
     * @param {BlobServiceClient} blobServiceClient 
     */
    migrate: async (blobServiceClient) => {
        // const containerClient = blobServiceClient.getContainerClient('<container-name>');
        // const blobClient = container.getBlockBlobClient('<blob-name>');
        // const text = "Hello World!";
        // await blobClient.upload(text, text.length);
    }
}
        `
    } else {
        sampleFile = '# az storage ... https://docs.microsoft.com/en-us/cli/azure/storage?view=azure-cli-latest'
    }

    if (!fs.existsSync(scriptsDirectory)){
        fs.mkdirSync(scriptsDirectory);
    }

    fs.writeFile(filepath, sampleFile, (err) => {
        if(err) throw err;
    })
}