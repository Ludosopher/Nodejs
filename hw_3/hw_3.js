const fs = require('fs');
const {Transform} = require('stream');

const readStream = fs.createReadStream('./hw_3/access.log', 'utf-8');
const writeStream_89_123_1_41 = fs.createWriteStream('./hw_3/89.123.1.41_requests.log', {
    flags: 'a',
    encoding: 'utf-8'
});
const writeStream_34_48_240_111 = fs.createWriteStream('./hw_3/34.48.240.111_requests.log', {
    flags: 'a',
    encoding: 'utf-8'
});

const transformStream_89_123_1_41 = new Transform({
    transform(chank, encoding, callback) {
        const transformChank = chank
            .toString()
            .match(/(^.*89\.123\.1\.41.*$)/gm)
            .join("\n");
        callback(null, transformChank);
    },
});

const transformStream_34_48_240_111 = new Transform({
    transform(chank, encoding, callback) {
        const transformChank = chank
            .toString()
            .match(/(^.*34\.48\.240\.111.*$)/gm)
            .join("\n");
        callback(null, transformChank);
    },
});

readStream.pipe(transformStream_89_123_1_41).pipe(writeStream_89_123_1_41);
readStream.pipe(transformStream_34_48_240_111).pipe(writeStream_34_48_240_111);
console.log("Запись завершена!");

