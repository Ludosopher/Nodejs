const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");
const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const options = yargs
.usage("Usage: -p <path>").option("p", { 
    alias: "path", 
    describe: "Path to file", 
    type: "string",
    demandOption: true 
}).argv;

function preg_quote(str) {    
    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}
    

const multy_level_inquirer = (dirPath, inputed) => {
    
    const isFileOrDirectory = (name) => {
        return (fs.lstatSync(path.join(dirPath, name)).isFile()) || (fs.lstatSync(path.join(dirPath, name)).isDirectory()); 
    }

    const list = fs.readdirSync(dirPath).filter(isFileOrDirectory);

    const main = async () => {
        const answer = await inquirer.prompt([
            {
                name: "fileName",
                type: "list",
                message: "Chose file:",
                choices: list,
            },
        ]);
    
        const objectPath = path.join(dirPath, answer.fileName);
        
        if (fs.lstatSync(path.join(dirPath, answer.fileName)).isFile()) {
            const data = fs.readFileSync(objectPath, "utf-8");
            if (inputed != "") {
                const regexp = new RegExp(`^.*${preg_quote(inputed)}.*$`, 'gm');
                console.log(data.match(regexp).join("\n"));
            } else {
                console.log(data);
            }
            rl.close();
        } else if (fs.lstatSync(path.join(dirPath, answer.fileName)).isDirectory()) {
            multy_level_inquirer(objectPath, inputed);
        }
    }
    
    main();
}

rl.question("Please, enter a search query: ", function (inputed) {
    multy_level_inquirer(options.path, inputed);
});
