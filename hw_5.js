const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const { rawListeners } = require("process");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        let name = "";
        const parsedUrl = url.parse(req.url, true);
        
        if (typeof parsedUrl.query.path != "undefined") {
            var filePath = parsedUrl.query.path;
        } else {
            var filePath = path.join(__dirname, "");
        }
        if (parsedUrl.pathname === "/content") {
            if (typeof parsedUrl.query.name != "undefined") {
                name = '\\' + parsedUrl.query.name;
            } else {
                res.writeHead(400, "Not Found");
                res.end();
            }
        }

        const filePathIndex = path.join("C:\\Users\\User\\projects\\nodejs", "./index.html");
        const filePathPattern = path.join("C:\\Users\\User\\projects\\nodejs", "./pattern.html");
        const readStreamPattern = fs.createReadStream(filePathPattern, 'utf-8');
        const writeStream = fs.createWriteStream(filePathIndex, {
            flags: 'w',
            encoding: 'utf-8'
        });
        
        if (fs.lstatSync(path.join(filePath, '.' + name)).isFile()) {
            const filePathFile = path.join(filePath, "." + name);
            const readStreamFile = fs.createReadStream(filePathFile, 'utf-8');
            readStreamFile.pipe(res);
        } else {
            let data = "";
            readStreamPattern.on('data', (chunk) => {
                data += chunk;
            });
            readStreamPattern.on('end', () => {
                const arr = (filePath + name).split('\\');
                 const dir = arr[arr.length-1];
                const files = fs.readdirSync(filePath + name);
                let content = "";
                for (let i = 0; i <= files.length-1; i++) {
                    content += `<a href='http://localhost:3000/content?path=${filePath + name}&name=${files[i]}'>${files[i]}</a><br>`
                }
    
                data = data.replace(/{{directory}}/g, dir).replace(/{{content}}/g, content);
                writeStream.write(data);
                writeStream.end(() => "");
    
                const readStreamIndex = fs.createReadStream(filePathIndex);
                res.setHeader('Content-Type', 'text/html');
                readStreamIndex.pipe(res);
            });
        }
    } else {
        res.writeHead(405, "Method not Allowed");
        res.end("Method not Allowed");
    }
});

server.listen(3000, 'localhost');