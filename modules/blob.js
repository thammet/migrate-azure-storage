const { BlobServiceClient, BlockBlobClient} = require("@azure/storage-blob");

module.exports = {
    /**
     * Connects to the storage account and retrieves the blob used to persist script history
     * @returns {Promise<[BlobServiceClient, BlockBlobClient]>}
     */
    loadBlobServiceClientAndHistoryBlob: async () => {
        if(process.env.AZURE_STORAGE_CONNECTION_STRING == null) {
            throw new Error("Missing environment variable: 'AZURE_STORAGE_CONNECTION_STRING'");
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('migrate-azure-storage');
        await containerClient.createIfNotExists();
        return [blobServiceClient, containerClient.getBlockBlobClient('history')];
    }
}