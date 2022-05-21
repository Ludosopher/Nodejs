const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const countDown = (time_str) => {
    var time_array = time_str.split('-');
    time_arr = time_array.reverse();
    var date = new Date(time_arr[0], time_arr[1]-1, time_arr[2], time_arr[3]);
    var now = new Date();
    var diff = date - now;

    if (diff < 0) {
        return "time's up";
    }
    
    return parseInt(diff/1000);
}


const times = ["20-21-05-2022", "20-21-05-2022"];


eventEmitter.on("timer", (payload) => { console.log(payload) });

for (let i = 0; i + 1 <= times.length; i++) {
    const timerId = setInterval(() => eventEmitter.emit("timer", ''.concat(i+1, ': ', countDown(times[i]))), 1000);
}

