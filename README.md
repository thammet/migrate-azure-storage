# migrate-azure-storage

Manage a history of azure storage migrations

# Installation
```
npm i migrate-azure-storage
```

# Usage

I recommend setting up scripts in your package.json:

``` json
"scripts": {
    "migrate-azure-storage:create": "migrate-azure-storage create",
    "migrate-azure-storage:migrate": "AZURE_STORAGE_CONNECTION_STRING='<CONNECTION_STRING>' migrate-azure-storage migrate"
},
```

> You must set an environment variable, **AZURE_STORAGE_CONNECTION_STRING**, before migrating.


## migrate-azure-storage create

The default behavior is to create a file with a **.azcli** extension and a reference to the azure storage docs.

```
# az storage ... https://docs.microsoft.com/en-us/cli/azure/storage?view=azure-cli-latest
```

> [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli) for developing and running commands of the Azure CLI. 

### -js option

An optional argument can be passed to create a javascript file and module accepting a BlobServiceClient.


``` js
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
```

```
Usage: migrate-azure-storage create [options] [filename]

create a new migration file

Options:
  -js         Create a javascript file (default: false)
  -h, --help  display help for command
```

## migrate-azure-storage migrate

Will run all of the newly created scripts. After each script is executed, it will update the history saved in blob storage.

## How migrate-azure-storage saves history

migrate-azure-storage connects to the storage account via the connection string you set for AZURE_STORAGE_CONNECTION_STRING. It then creates a new container called migrate-azure-storage and writes the history to a blob called history. 

The next time migrations are ran it will read from the history blob, so it only runs newly created migrations.