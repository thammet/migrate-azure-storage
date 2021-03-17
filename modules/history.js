const { BlockBlobClient} = require("@azure/storage-blob");
const fs = require('fs');

const streamToBuffer = async (readableStream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

const SCRIPTS_DIRECTORY = 'scripts'

module.exports = {
    scriptsDirectory: SCRIPTS_DIRECTORY,

    /**
     * Loads the filenames of scripts to execute from machine
     * @returns {string[]}
     */
    load: () => {
      if (!fs.existsSync(SCRIPTS_DIRECTORY)){
        return [];
      }

      return fs.readdirSync(SCRIPTS_DIRECTORY)
        .filter(filename => filename.endsWith('.azcli') || filename.endsWith('.js'));
    },

    /**
     * Loads the history of scripts executed against the storage account
     * @param {BlockBlobClient} historyBlob 
     * @returns {Promise<string[]>}
     */
    loadHistory: async (historyBlob) => {
        const exists = await historyBlob.exists();

        if (!exists) {
            return [];
        }

        const downloadBlockBlobResponse = await historyBlob.download();
        const downloaded = (await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)).toString();
        return downloaded.split(',');
    },

    /**
     * Saves the history of scripts executed against the storage account
     * @param {BlockBlobClient} historyBlob 
     * @param {string[]} scripts 
     */
    save: async (historyBlob, scripts) => {
        const text = scripts.join(',');
        await historyBlob.upload(text, text.length);
    }
}