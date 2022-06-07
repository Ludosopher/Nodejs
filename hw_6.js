const socket = require("socket.io");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Worker } = require('worker_threads');

function start(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
    })
}

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, "./hw_6.html");
    const readStream = fs.createReadStream(indexPath);
    
    readStream.pipe(res);
});

const io = socket(server);
var user_counter = 0;

io.on("connection", (client) => {
    user_counter++;
    console.log("Connected");
    client.broadcast.emit("newConnect", "New client is connected");
    io.sockets.emit("userCount", user_counter);
    
    client.on("newMessage", (data) => {
        console.log(data);
        data = { ...data, userCounter: user_counter};
        client.broadcast.emit("newMessage", data);
        client.emit("newMessage", data);
    });

    client.on("searchData", (data) => {
        start(data)
        .then(result => client.emit("searchData", result.result))
        .catch(err => console.error(err));
    });

    client.on("disconnect", () => {
        user_counter--;
        console.log("Disconnected");
        io.sockets.emit("newDisconnect", "New client is disconnected");
    });

});


server.listen(3000, 'localhost');