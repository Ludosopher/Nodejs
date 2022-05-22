const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const countDown = (time_str) => {
    var time_arr = time_str.split('-');
    var date = new Date(time_arr[4], time_arr[3]-1, time_arr[2], time_arr[1], time_arr[0]);
    var now = new Date();
    var diff = date - now;

    if (diff < 0) {
        return "time's up";
    }
    
    return parseInt(diff/1000);
}


const times = ["05-22-22-05-2022", "06-22-22-05-2022", "07-22-22-05-2022"];

eventEmitter.on("timer", (payload) => { console.log(payload) });

for (let i = 0; i + 1 <= times.length; i++) {
    const timerId = setInterval(() => eventEmitter.emit("timer", ''.concat(i+1, ': ', countDown(times[i]))), 1000);
    setTimeout(() => clearInterval(timerId), (countDown(times[i]) + 2) * 1000);
}