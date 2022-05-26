const fs = require('fs');
const {Transform} = require('stream');

const readStream = fs.createReadStream('./hw_3/access.log', 'utf-8');
const writeStream = fs.createWriteStream('./hw_3/procesed.log', {
    flags: 'a',
    encoding: 'utf-8'
});

const transformStream = new Transform({
    transform(chank, encoding, callback) {
        const transformChank = chank
            .toString()
            //.replace(new RegExp("\n\nText afer read", "g"), "");
            .match(/(^.*89\.123\.1\.41.*$|^.*34\.48\.240\.111.*$)/gm)
            .join("\n");
        callback(null, transformChank);
    },
});

readStream.pipe(transformStream).pipe(writeStream);
console.log("Запись завершена!");

