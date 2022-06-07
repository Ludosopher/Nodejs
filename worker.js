const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");
const readLine = require("readline");
const { workerData, parentPort } = require('worker_threads');

function preg_quote(str) {    
    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}
    

const searchInFile = (file_path, query) => {
    const objectPath = path.join(__dirname, file_path);
    if (fs.existsSync(objectPath) && fs.lstatSync(objectPath).isFile()) {
        const data = fs.readFileSync(objectPath, "utf-8");
        if (query != "") {
            const regexp = new RegExp(`^.*${preg_quote(query)}.*$`, 'gm');
            if (data.match(regexp) != null) {
                return data.match(regexp).join("\n");
            } else {
                return data;
            }
        } else {
            return data;
        }
    } else {
        return "No such file";
    }
}


parentPort.postMessage({ 
    result: searchInFile(workerData.path, workerData.query)
});


