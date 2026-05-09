const imageKit = require('@imagekit/nodejs');

const imagekitClient = new imageKit({
    privateKey: process.env.URI_IMAGEKIT,
});

async function uploadFile(file) {
    const result = await imagekitClient.files.upload({
        file, 
        fileName: 'music' + Date.now() ,  
        filePath: '/music'
    });
    return result;

}

module.exports = {
    uploadFile
 }