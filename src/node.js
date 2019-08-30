const fs = require('fs');
const path = require('path');
const decodeImage = require('jimp').read;
const qrcodeReader = require('qrcode-reader');

const readMarkdownFile = (filename) => {
    const filePath = path.resolve(__dirname, `./assets/markdown/${filename}.md`);
    return fs.readFileSync(filePath, 'utf8');
};

const readFileBuffer = (filePath) => {
    const buffer = fs.readFileSync(filePath);
    return buffer;
};

const readQrcodeImage = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileBuffer) => {
            if (err) {
                throw new Error(err);
            }
            let decodeQR = new qrcodeReader();
            decodeQR.callback = function(errorWhenDecodeQR, result) {
                if (errorWhenDecodeQR) {
                    throw new Error(errorWhenDecodeQR);
                }
                if (!result){
                    console.log('gone with wind');
                } else {
                    console.log(result.result);  //结果
                    resolve(result.result);
                }
            };
            decodeImage(fileBuffer).then(image => {
                decodeQR.decode(image.bitmap);
            }).catch(err => {
                throw new Error(err);
            });
        });
    });
};

module.exports = {
    readMarkdownFile,
    readQrcodeImage,
};
